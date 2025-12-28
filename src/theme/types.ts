export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  primary: string;
  secondary: string;
  warning: string;
  danger: string;
  muted: string;
}

export interface Theme {
  name: "light" | "dark";
  colors: ThemeColors;
}
