import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authStorage, User } from "@/storage/authStorage";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const stored = await authStorage.getUser();
      setUser(stored);
      setLoading(false);
    };
    load();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação simples - em produção, validar com backend
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
    };
    await authStorage.saveUser(newUser);
    setUser(newUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulação simples - em produção, criar conta no backend
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
    };
    await authStorage.saveUser(newUser);
    setUser(newUser);
  };

  const logout = async () => {
    await authStorage.clear();
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider não encontrado");
  return ctx;
};
