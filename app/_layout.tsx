import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { HabitsProvider } from "@/hooks/HabitsContext";
import { AuthProvider, useAuth } from "@/hooks/AuthContext";
import { ActivityIndicator, View } from "react-native";

const RootStack = () => {
  const { theme } = useTheme();
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(tabs)" || segments[0] === "habit";

    if (!user && inAuthGroup) {
      router.replace("/login");
    } else if (user && !inAuthGroup && segments[0] !== "habit") {
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="habit/[id]" 
        options={{ 
          headerShown: false,
          presentation: "card"
        }} 
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HabitsProvider>
          <RootStack />
        </HabitsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
