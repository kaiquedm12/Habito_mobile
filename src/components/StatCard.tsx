import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

interface Props {
  label: string;
  value: string;
  accent?: string;
}

export const StatCard: React.FC<Props> = ({ label, value, accent }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        minWidth: 140,
      }}
    >
      <Text style={{ color: theme.colors.subtext, marginBottom: 4 }}>{label}</Text>
      <Text style={{ color: accent ?? theme.colors.text, fontSize: 18, fontWeight: "700" }}>{value}</Text>
    </View>
  );
};
