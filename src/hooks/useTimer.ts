import { useEffect, useRef, useState } from "react";
import { HabitSession } from "@/types/habit";
import { nowIso } from "@/utils/time";

interface TimerState {
  habitId: string | null;
  startedAt: number | null;
  elapsed: number; // in seconds
  isRunning: boolean;
}

interface Options {
  onFinish: (session: HabitSession) => Promise<void> | void;
}

export const useTimer = ({ onFinish }: Options) => {
  const [state, setState] = useState<TimerState>({ habitId: null, startedAt: null, elapsed: 0, isRunning: false });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState((prev) => ({ ...prev, elapsed: prev.elapsed + 1 }));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning]);

  const start = (habitId: string) => {
    setState({ habitId, startedAt: Date.now(), elapsed: 0, isRunning: true });
  };

  const pause = () => setState((prev) => ({ ...prev, isRunning: false }));

  const resume = () => setState((prev) => ({ ...prev, isRunning: true }));

  const stop = async () => {
    if (!state.habitId || state.elapsed === 0) {
      setState({ habitId: null, startedAt: null, elapsed: 0, isRunning: false });
      return;
    }
    const minutes = Math.max(1, Math.floor(state.elapsed / 60));
    const session: HabitSession = {
      id: `session-${nowIso()}`,
      habitId: state.habitId,
      minutes,
      startedAt: new Date(state.startedAt ?? Date.now()).toISOString(),
      endedAt: nowIso(),
    };
    await onFinish(session);
    setState({ habitId: null, startedAt: null, elapsed: 0, isRunning: false });
  };

  return { state, start, pause, resume, stop };
};
