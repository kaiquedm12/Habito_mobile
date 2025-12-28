export type HabitLevel = "bronze" | "prata" | "ouro" | "pro";

export type Timeframe = "daily" | "weekly" | "monthly";

export interface HabitSession {
  id: string;
  habitId: string;
  minutes: number;
  startedAt: string;
  endedAt: string;
  manuallyAdded?: boolean;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
  targetHours?: number;
  totalMinutes: number;
  sessions: HabitSession[];
  createdAt: string;
  updatedAt: string;
}

export interface HabitRecordSummary {
  habitId: string;
  longestSessionMinutes: number;
  mostProductiveDay: string;
  totalMinutes: number;
  sessionCount: number;
}

export interface RankingInfo {
  level: HabitLevel;
  nextLevelTargetMinutes: number | null;
  progressToNext: number;
}
