import { Habit } from "@/types/habit";
import { nowIso } from "./time";

const baseDate = nowIso();

export const mockHabits: Habit[] = [
  {
    id: "habit-1",
    name: "Correr",
    icon: "run",
    color: "#22c55e",
    category: "Saúde",
    targetHours: 30,
    totalMinutes: 1200,
    sessions: [
      {
        id: "s1",
        habitId: "habit-1",
        minutes: 60,
        startedAt: baseDate,
        endedAt: baseDate,
      },
      {
        id: "s2",
        habitId: "habit-1",
        minutes: 90,
        startedAt: baseDate,
        endedAt: baseDate,
      },
    ],
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "habit-2",
    name: "Estudar",
    icon: "book",
    color: "#6366f1",
    category: "Produtividade",
    targetHours: 40,
    totalMinutes: 800,
    sessions: [
      {
        id: "s3",
        habitId: "habit-2",
        minutes: 45,
        startedAt: baseDate,
        endedAt: baseDate,
      },
      {
        id: "s4",
        habitId: "habit-2",
        minutes: 120,
        startedAt: baseDate,
        endedAt: baseDate,
      },
    ],
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: "habit-3",
    name: "Ler",
    icon: "book-open",
    color: "#eab308",
    category: "Bem-estar",
    targetHours: 15,
    totalMinutes: 420,
    sessions: [
      {
        id: "s5",
        habitId: "habit-3",
        minutes: 30,
        startedAt: baseDate,
        endedAt: baseDate,
      },
    ],
    createdAt: baseDate,
    updatedAt: baseDate,
  },
];
