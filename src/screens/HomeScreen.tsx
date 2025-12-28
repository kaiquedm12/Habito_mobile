import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HabitCard } from "@/components/HabitCard";
import { HabitForm } from "@/components/HabitForm";
import { Screen } from "@/components/Screen";
import { StatCard } from "@/components/StatCard";
import { useHabits } from "@/hooks/useHabits";
import { useStats } from "@/hooks/useStats";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/theme/ThemeProvider";
import { minutesToHours } from "@/utils/time";

export const HomeScreen: React.FC = () => {
  const { theme, toggle } = useTheme();
  const { habits, createHabit } = useHabits();
  const stats = useStats(habits);
  const { user, logout } = useAuth();

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <View>
          <Text style={{ color: theme.colors.subtext, fontSize: 14 }}>Olá,</Text>
          <Text style={{ color: theme.colors.text, fontSize: 26, fontWeight: "800" }}>{user?.name ?? "Usuário"}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity onPress={toggle} style={{ padding: 8 }}>
            <MaterialCommunityIcons name={theme.name === "dark" ? "white-balance-sunny" : "moon-waning-crescent"} size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={{ padding: 8 }}>
            <MaterialCommunityIcons name="logout" size={24} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
        <StatCard label="Total de horas" value={`${minutesToHours(stats.overallMinutes).toFixed(1)}h`} />
        <StatCard label="Hábitos ativos" value={`${habits.length}`} />
      </View>

      <HabitForm onSubmit={createHabit} submitLabel="Adicionar hábito" />

      <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 18, marginTop: 24, marginBottom: 12 }}>Seus hábitos</Text>
      <View>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </View>
    </Screen>
  );
};
