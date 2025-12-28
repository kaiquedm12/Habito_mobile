import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "@/types/habit";

const HABITS_KEY = "habito:habits";

export const habitStorage = {
  async getAll(): Promise<Habit[]> {
    const data = await AsyncStorage.getItem(HABITS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Habit[];
  },
  async saveAll(habits: Habit[]): Promise<void> {
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  },
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(HABITS_KEY);
  },
};
