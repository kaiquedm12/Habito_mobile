import React from "react";
import { View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

interface Props {
  progress: number; // 0..1
  color?: string;
}

export const ProgressBar: React.FC<Props> = ({ progress, color }) => {
  const { theme } = useTheme();
  const width = Math.max(0, Math.min(1, progress));
  return (
    <View style={{ height: 10, backgroundColor: theme.colors.border, borderRadius: 8, overflow: "hidden" }}>
      <View
        style={{
          width: `${width * 100}%`,
          backgroundColor: color ?? theme.colors.primary,
          height: 10,
        }}
      />
    </View>
  );
};
