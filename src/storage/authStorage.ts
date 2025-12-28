import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "habito:auth";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const authStorage = {
  async getUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(AUTH_KEY);
    if (!data) return null;
    return JSON.parse(data) as User;
  },
  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_KEY);
  },
};
