import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export const Screen: React.FC<{ children: React.ReactNode; padded?: boolean }> = ({ children, padded = true }) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.name === "dark" ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={{ padding: padded ? 16 : 0 }}>{children}</ScrollView>
    </View>
  );
};
