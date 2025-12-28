import React from "react";
import { Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "@/components/Screen";
import { useHabits } from "@/hooks/useHabits";
import { useStats } from "@/hooks/useStats";
import { useTheme } from "@/theme/ThemeProvider";
import { formatMinutes } from "@/utils/time";

export const StatsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { habits } = useHabits();
  const stats = useStats(habits);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: "800", marginBottom: 4 }}>
            Estatísticas
          </Text>
          <Text style={{ color: theme.colors.subtext, fontSize: 14 }}>
            Acompanhe seu progresso e conquistas
          </Text>
        </View>

        {/* Cards de resumo */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, padding: 16, borderRadius: 16, alignItems: "center" }}
          >
            <MaterialCommunityIcons name="clock-outline" size={32} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 8 }}>
              {formatMinutes(stats.overallMinutes)}
            </Text>
            <Text style={{ color: "#fff", fontSize: 12, opacity: 0.9 }}>Total Geral</Text>
          </LinearGradient>

          <LinearGradient
            colors={["#f093fb", "#f5576c"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, padding: 16, borderRadius: 16, alignItems: "center" }}
          >
            <MaterialCommunityIcons name="fire" size={32} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 8 }}>
              {Object.keys(stats.timeframeTotals.daily).length}
            </Text>
            <Text style={{ color: "#fff", fontSize: 12, opacity: 0.9 }}>Hábitos Ativos</Text>
          </LinearGradient>
        </View>

        {/* Progresso por hábito */}
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "700", marginBottom: 16 }}>
          Progresso por Hábito
        </Text>

        {habits.length === 0 ? (
          <View style={{ 
            backgroundColor: theme.colors.card, 
            padding: 32, 
            borderRadius: 16, 
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginBottom: 20
          }}>
            <MaterialCommunityIcons name="chart-line" size={48} color={theme.colors.subtext} />
            <Text style={{ color: theme.colors.subtext, marginTop: 12, textAlign: "center" }}>
              Nenhum hábito criado ainda
            </Text>
          </View>
        ) : (
          habits.map((habit) => {
            const daily = stats.timeframeTotals.daily[habit.id] ?? 0;
            const weekly = stats.timeframeTotals.weekly[habit.id] ?? 0;
            const monthly = stats.timeframeTotals.monthly[habit.id] ?? 0;
            
            return (
              <View 
                key={habit.id} 
                style={{ 
                  backgroundColor: theme.colors.card, 
                  padding: 16, 
                  borderRadius: 16, 
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <View 
                    style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 20, 
                      backgroundColor: habit.color + "20",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12
                    }}
                  >
                    <MaterialCommunityIcons name={habit.icon as any} size={24} color={habit.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
                      {habit.name}
                    </Text>
                    <Text style={{ color: theme.colors.subtext, fontSize: 12 }}>
                      {habit.category}
                    </Text>
                  </View>
                </View>

                {/* Estatísticas de tempo */}
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 12 }}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: theme.colors.subtext, fontSize: 12, marginBottom: 4 }}>Hoje</Text>
                    <Text style={{ color: habit.color, fontSize: 18, fontWeight: "700" }}>
                      {formatMinutes(daily)}
                    </Text>
                  </View>
                  <View style={{ width: 1, backgroundColor: theme.colors.border }} />
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: theme.colors.subtext, fontSize: 12, marginBottom: 4 }}>Semana</Text>
                    <Text style={{ color: habit.color, fontSize: 18, fontWeight: "700" }}>
                      {formatMinutes(weekly)}
                    </Text>
                  </View>
                  <View style={{ width: 1, backgroundColor: theme.colors.border }} />
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: theme.colors.subtext, fontSize: 12, marginBottom: 4 }}>Mês</Text>
                    <Text style={{ color: habit.color, fontSize: 18, fontWeight: "700" }}>
                      {formatMinutes(monthly)}
                    </Text>
                  </View>
                </View>

                {/* Barra de progresso */}
                <View style={{ marginTop: 12 }}>
                  <View style={{ 
                    height: 8, 
                    backgroundColor: theme.colors.border, 
                    borderRadius: 4, 
                    overflow: "hidden" 
                  }}>
                    <View 
                      style={{ 
                        height: "100%", 
                        width: `${Math.min((habit.totalMinutes / (habit.targetHours * 60)) * 100, 100)}%`,
                        backgroundColor: habit.color
                      }} 
                    />
                  </View>
                  <Text style={{ color: theme.colors.subtext, fontSize: 11, marginTop: 4 }}>
                    {formatMinutes(habit.totalMinutes)} de {habit.targetHours}h meta
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </Screen>
  );
};
