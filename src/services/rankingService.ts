import { HabitLevel, RankingInfo } from "@/types/habit";

const thresholds: { level: HabitLevel; minutes: number }[] = [
  { level: "bronze", minutes: 1200 }, // 20h
  { level: "prata", minutes: 1500 }, // 25h
  { level: "ouro", minutes: 1800 }, // 30h
  { level: "pro", minutes: 1801 },
];

export const getRanking = (totalMinutes: number): RankingInfo => {
  const level = thresholds.reduce<HabitLevel>((acc, current) => {
    return totalMinutes >= current.minutes ? current.level : acc;
  }, "bronze");

  const currentIndex = thresholds.findIndex((t) => t.level === level);
  const next = thresholds[currentIndex + 1];
  const nextLevelTargetMinutes = next ? next.minutes : null;
  const progressToNext = next ? Math.min(1, totalMinutes / next.minutes) : 1;

  return { level, nextLevelTargetMinutes, progressToNext };
};

export const getRankingInfo = (totalHours: number) => {
  const levels = [
    { name: "Bronze", min: 0, max: 20 },
    { name: "Prata", min: 20, max: 25 },
    { name: "Ouro", min: 25, max: 30 },
    { name: "Pro", min: 30, max: Infinity }
  ];

  let level = "Bronze";
  let description = "Iniciante";
  let nextLevel = "Prata";
  let hoursToNext = 20;
  let progressToNext = totalHours;

  if (totalHours >= 30) {
    level = "Pro";
    description = "Nível Máximo";
    nextLevel = "Pro";
    hoursToNext = 0;
    progressToNext = totalHours - 30;
  } else if (totalHours >= 25) {
    level = "Ouro";
    description = "Excelente";
    nextLevel = "Pro";
    hoursToNext = 30 - totalHours;
    progressToNext = totalHours - 25;
  } else if (totalHours >= 20) {
    level = "Prata";
    description = "Muito Bom";
    nextLevel = "Ouro";
    hoursToNext = 25 - totalHours;
    progressToNext = totalHours - 20;
  } else {
    level = "Bronze";
    description = "Iniciante";
    nextLevel = "Prata";
    hoursToNext = 20 - totalHours;
    progressToNext = totalHours;
  }

  return {
    level,
    description,
    nextLevel,
    hoursToNext: Math.max(0, hoursToNext),
    progressToNext: Math.max(0, progressToNext)
  };
};
