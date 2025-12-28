import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

interface Props {
  label: string;
  values: number[];
  color?: string;
}

// Simple bar visualization to avoid extra dependencies.
export const StatsChart: React.FC<Props> = ({ label, values, color }) => {
  const { theme } = useTheme();
  const max = Math.max(1, ...values);
  return (
    <View style={{ backgroundColor: theme.colors.card, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border }}>
      <Text style={{ color: theme.colors.text, fontWeight: "700", marginBottom: 8 }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", height: 80 }}>
        {values.map((v, idx) => (
          <View key={idx} style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: 10,
                height: (v / max) * 70,
                backgroundColor: color ?? theme.colors.primary,
                borderRadius: 6,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
