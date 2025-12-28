import React from "react";
import { Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "@/components/Screen";
import { useHabits } from "@/hooks/useHabits";
import { useTheme } from "@/theme/ThemeProvider";
import { formatMinutes } from "@/utils/time";
import { getRankingInfo } from "@/services/rankingService";

export const RecordsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { habits } = useHabits();

  const getMedalColor = (level: string): [string, string] => {
    switch (level) {
      case "Pro": return ["#FFD700", "#FFA500"]; // Ouro brilhante
      case "Ouro": return ["#FFD700", "#DAA520"];
      case "Prata": return ["#C0C0C0", "#A8A8A8"];
      case "Bronze": return ["#CD7F32", "#8B4513"];
      default: return ["#94a3b8", "#64748b"];
    }
  };

  const getMedalIcon = (level: string) => {
    switch (level) {
      case "Pro": return "crown";
      case "Ouro": return "medal";
      case "Prata": return "medal";
      case "Bronze": return "medal";
      default: return "trophy-outline";
    }
  };

  const sortedHabits = [...habits].sort((a, b) => b.totalMinutes - a.totalMinutes);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: "800", marginBottom: 4 }}>
            Recordes & Ranking
          </Text>
          <Text style={{ color: theme.colors.subtext, fontSize: 14 }}>
            Suas conquistas e medalhas
          </Text>
        </View>

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
            <MaterialCommunityIcons name="trophy-outline" size={48} color={theme.colors.subtext} />
            <Text style={{ color: theme.colors.subtext, marginTop: 12, textAlign: "center" }}>
              Crie hábitos para começar a conquistar medalhas!
            </Text>
          </View>
        ) : (
          <>
            {/* Ranking de Hábitos */}
            <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "700", marginBottom: 16 }}>
              🏆 Ranking de Hábitos
            </Text>

            {sortedHabits.map((habit, index) => {
              const ranking = getRankingInfo(habit.totalMinutes / 60);
              const medalColors = getMedalColor(ranking.level);
              const medalIcon = getMedalIcon(ranking.level);
              const progress = ranking.level === "Pro" ? 100 : (ranking.progressToNext / ranking.hoursToNext) * 100;

              return (
                <View 
                  key={habit.id}
                  style={{ 
                    backgroundColor: theme.colors.card,
                    borderRadius: 16,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3
                  }}
                >
                  {/* Posição no ranking */}
                  <View 
                    style={{ 
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : theme.colors.border,
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1
                    }}
                  >
                    <Text style={{ color: index < 3 ? "#000" : theme.colors.text, fontWeight: "800", fontSize: 14 }}>
                      #{index + 1}
                    </Text>
                  </View>

                  <LinearGradient
                    colors={medalColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 16, paddingRight: 56 }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialCommunityIcons name={medalIcon as any} size={40} color="#fff" />
                      <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
                          {ranking.level}
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 12, opacity: 0.9 }}>
                          {ranking.description}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <View style={{ padding: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <View 
                        style={{ 
                          width: 48, 
                          height: 48, 
                          borderRadius: 24, 
                          backgroundColor: habit.color + "20",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12
                        }}
                      >
                        <MaterialCommunityIcons name={habit.icon as any} size={28} color={habit.color} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700" }}>
                          {habit.name}
                        </Text>
                        <Text style={{ color: theme.colors.subtext, fontSize: 13 }}>
                          {habit.category}
                        </Text>
                      </View>
                    </View>

                    {/* Tempo total */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <MaterialCommunityIcons name="clock" size={20} color={habit.color} />
                      <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600", marginLeft: 8 }}>
                        {formatMinutes(habit.totalMinutes)} acumulados
                      </Text>
                    </View>

                    {/* Progresso para próximo nível */}
                    {ranking.level !== "Pro" && (
                      <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text style={{ color: theme.colors.subtext, fontSize: 12 }}>
                            Próximo nível: {ranking.nextLevel}
                          </Text>
                          <Text style={{ color: theme.colors.subtext, fontSize: 12 }}>
                            {ranking.hoursToNext}h restantes
                          </Text>
                        </View>
                        <View style={{ 
                          height: 8, 
                          backgroundColor: theme.colors.border, 
                          borderRadius: 4, 
                          overflow: "hidden" 
                        }}>
                          <View 
                            style={{ 
                              height: "100%", 
                              width: `${Math.min(progress, 100)}%`,
                              backgroundColor: habit.color
                            }} 
                          />
                        </View>
                      </View>
                    )}

                    {/* Conquista máxima */}
                    {ranking.level === "Pro" && (
                      <View style={{ 
                        backgroundColor: medalColors[0] + "20",
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center"
                      }}>
                        <Text style={{ color: medalColors[0], fontWeight: "700", fontSize: 14 }}>
                          ⭐ NÍVEL MÁXIMO ALCANÇADO! ⭐
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}

            {/* Legenda dos níveis */}
            <View style={{ 
              backgroundColor: theme.colors.card,
              padding: 16,
              borderRadius: 16,
              marginTop: 8,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: theme.colors.border
            }}>
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700", marginBottom: 12 }}>
                📋 Sistema de Níveis
              </Text>
              
              {[
                { level: "Bronze", hours: 20, colors: ["#CD7F32", "#8B4513"] },
                { level: "Prata", hours: 25, colors: ["#C0C0C0", "#A8A8A8"] },
                { level: "Ouro", hours: 30, colors: ["#FFD700", "#DAA520"] },
                { level: "Pro", hours: "30+", colors: ["#FFD700", "#FFA500"] }
              ].map((item, idx) => (
                <View key={idx} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <LinearGradient
                    colors={item.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: 16, 
                      alignItems: "center", 
                      justifyContent: "center",
                      marginRight: 12
                    }}
                  >
                    <MaterialCommunityIcons 
                      name={item.level === "Pro" ? "crown" : "medal"} 
                      size={18} 
                      color="#fff" 
                    />
                  </LinearGradient>
                  <Text style={{ color: theme.colors.text, flex: 1 }}>
                    <Text style={{ fontWeight: "700" }}>{item.level}</Text>: {item.hours} horas
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </Screen>
  );
};
