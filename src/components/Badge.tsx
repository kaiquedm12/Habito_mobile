import React from "react";
import { Text, View } from "react-native";
import { HabitLevel } from "@/types/habit";
import { useTheme } from "@/theme/ThemeProvider";

const levelColor: Record<HabitLevel, string> = {
  bronze: "#b45309",
  prata: "#94a3b8",
  ouro: "#f59e0b",
  pro: "#22c55e",
};

export const Badge: React.FC<{ level: HabitLevel }> = ({ level }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: levelColor[level],
      }}
    >
      <Text style={{ color: theme.colors.card, fontWeight: "700", textTransform: "uppercase" }}>{level}</Text>
    </View>
  );
};
