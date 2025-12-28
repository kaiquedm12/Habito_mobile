import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import { Theme } from "./types";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [userPreference, setUserPreference] = useState<"light" | "dark" | null>(null);

  const active = useMemo(() => {
    const name = userPreference ?? (systemScheme === "dark" ? "dark" : "light");
    return name === "dark" ? darkTheme : lightTheme;
  }, [systemScheme, userPreference]);

  const toggle = () => setUserPreference((prev) => (prev === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme: active, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not found");
  return ctx;
};
