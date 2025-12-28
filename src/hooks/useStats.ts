import { useMemo } from "react";
import { Habit, HabitRecordSummary, RankingInfo, Timeframe } from "@/types/habit";
import { formatDate, timeframeDays } from "@/utils/time";
import { getRanking } from "@/services/rankingService";

interface StatsResult {
  totalsByHabit: Record<string, number>;
  timeframeTotals: Record<Timeframe, Record<string, number>>;
  rankingByHabit: Record<string, RankingInfo>;
  records: HabitRecordSummary[];
  overallMinutes: number;
}

export const useStats = (habits: Habit[]): StatsResult => {
  return useMemo(() => {
    const totalsByHabit: Record<string, number> = {};
    const timeframeTotals: StatsResult["timeframeTotals"] = { daily: {}, weekly: {}, monthly: {} };
    const rankingByHabit: Record<string, RankingInfo> = {};
    const records: HabitRecordSummary[] = [];

    let overallMinutes = 0;

    habits.forEach((habit) => {
      totalsByHabit[habit.id] = habit.totalMinutes;
      overallMinutes += habit.totalMinutes;

      const ranking = getRanking(habit.totalMinutes);
      rankingByHabit[habit.id] = ranking;

      const sessionsSorted = [...habit.sessions].sort(
        (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      );
      const longest = sessionsSorted[0]?.minutes ?? 0;
      const mostProductiveDay = sessionsSorted[0]?.startedAt ? formatDate(sessionsSorted[0].startedAt) : "-";

      records.push({
        habitId: habit.id,
        longestSessionMinutes: longest,
        mostProductiveDay,
        totalMinutes: habit.totalMinutes,
        sessionCount: habit.sessions.length,
      });

      (Object.keys(timeframeTotals) as Timeframe[]).forEach((frame) => {
        const days = timeframeDays[frame];
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
        const total = habit.sessions
          .filter((s) => new Date(s.startedAt).getTime() >= cutoff)
          .reduce((sum, s) => sum + s.minutes, 0);
        timeframeTotals[frame][habit.id] = total;
      });
    });

    return { totalsByHabit, timeframeTotals, rankingByHabit, records, overallMinutes };
  }, [habits]);
};
