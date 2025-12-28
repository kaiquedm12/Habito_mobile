import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { habitStorage } from "@/storage/habitStorage";
import { Habit, HabitSession } from "@/types/habit";
import { nowIso } from "@/utils/time";
import { mockHabits } from "@/utils/mockData";

const buildHabit = (partial: Partial<Habit>): Habit => {
  const timestamp = nowIso();
  return {
    id: `habit-${timestamp}`,
    name: partial.name ?? "Novo hábito",
    icon: partial.icon ?? "star",
    color: partial.color ?? "#6366f1",
    category: partial.category ?? "Geral",
    targetHours: partial.targetHours,
    totalMinutes: 0,
    sessions: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

interface HabitsContextValue {
  habits: Habit[];
  loading: boolean;
  createHabit: (partial: Partial<Habit>) => Promise<Habit>;
  updateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  addSession: (id: string, session: HabitSession) => Promise<void>;
  addManualMinutes: (id: string, minutes: number) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextValue | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const stored = await habitStorage.getAll();
      if (stored.length === 0) {
        setHabits(mockHabits);
        await habitStorage.saveAll(mockHabits);
      } else {
        setHabits(stored);
      }
      setLoading(false);
    };
    load();
  }, []);

  const persist = async (next: Habit[]) => {
    setHabits(next);
    await habitStorage.saveAll(next);
  };

  const createHabit = async (partial: Partial<Habit>) => {
    const newHabit = buildHabit(partial);
    await persist([...habits, newHabit]);
    return newHabit;
  };

  const updateHabit = async (id: string, data: Partial<Habit>) => {
    const next = habits.map((habit) =>
      habit.id === id ? { ...habit, ...data, updatedAt: nowIso() } : habit
    );
    await persist(next);
  };

  const deleteHabit = async (id: string) => {
    const next = habits.filter((h) => h.id !== id);
    await persist(next);
  };

  const addSession = async (id: string, session: HabitSession) => {
    const next = habits.map((habit) => {
      if (habit.id !== id) return habit;
      const totalMinutes = habit.totalMinutes + session.minutes;
      return { ...habit, totalMinutes, sessions: [session, ...habit.sessions], updatedAt: nowIso() };
    });
    await persist(next);
  };

  const addManualMinutes = async (id: string, minutes: number) => {
    const session: HabitSession = {
      id: `session-${nowIso()}`,
      habitId: id,
      minutes,
      startedAt: nowIso(),
      endedAt: nowIso(),
      manuallyAdded: true,
    };
    await addSession(id, session);
  };

  const value = useMemo(
    () => ({
      habits,
      loading,
      createHabit,
      updateHabit,
      deleteHabit,
      addSession,
      addManualMinutes,
    }),
    [habits, loading]
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
};

export const useHabits = () => {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("HabitsProvider não encontrado");
  return ctx;
};