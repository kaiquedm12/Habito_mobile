import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeProvider";

const TabBarIcon = (name: string) => ({ color }: { color: string }) => (
  <MaterialCommunityIcons name={name as any} size={24} color={color} />
);

export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        tabBarStyle: { 
          backgroundColor: theme.colors.card,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Hábitos", tabBarIcon: TabBarIcon("home") }} />
      <Tabs.Screen name="stats" options={{ title: "Stats", tabBarIcon: TabBarIcon("chart-bar") }} />
      <Tabs.Screen name="records" options={{ title: "Recordes", tabBarIcon: TabBarIcon("trophy") }} />
    </Tabs>
  );
}
