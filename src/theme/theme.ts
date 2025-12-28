import { Theme } from "./types";

export const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "#f8fafc",
    card: "#ffffff",
    text: "#0f172a",
    subtext: "#475569",
    border: "#e2e8f0",
    primary: "#6366f1",
    secondary: "#22c55e",
    warning: "#eab308",
    danger: "#ef4444",
    muted: "#cbd5e1",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    background: "#0b1224",
    card: "#111827",
    text: "#e2e8f0",
    subtext: "#94a3b8",
    border: "#1f2937",
    primary: "#818cf8",
    secondary: "#4ade80",
    warning: "#facc15",
    danger: "#f87171",
    muted: "#334155",
  },
};
