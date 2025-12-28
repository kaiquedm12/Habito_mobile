import React, { useMemo, useState } from "react";
import { Alert, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screen } from "@/components/Screen";
import { TimerControls } from "@/components/TimerControls";
import { ProgressBar } from "@/components/ProgressBar";
import { useHabits } from "@/hooks/useHabits";
import { useTimer } from "@/hooks/useTimer";
import { useTheme } from "@/theme/ThemeProvider";
import { formatMinutes, minutesToHours } from "@/utils/time";
import { getRanking } from "@/services/rankingService";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Badge } from "@/components/Badge";

export const HabitDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const { habits, addSession, addManualMinutes, deleteHabit } = useHabits();
  const [manualMinutes, setManualMinutes] = useState("");

  const habit = useMemo(() => habits.find((h) => h.id === id), [habits, id]);

  const timer = useTimer({
    onFinish: async (session) => {
      if (!habit) return;
      await addSession(habit.id, session);
    },
  });

  if (!habit) {
    return (
      <Screen>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.text} />
          <Text style={{ color: theme.colors.text, marginLeft: 8, fontSize: 16 }}>Voltar</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.colors.text }}>Hábito não encontrado.</Text>
      </Screen>
    );
  }

  const ranking = getRanking(habit.totalMinutes);

  const handleManualAdd = async () => {
    const minutes = Number(manualMinutes);
    if (!minutes || minutes <= 0) return;
    await addManualMinutes(habit.id, minutes);
    setManualMinutes("");
  };

  const confirmDelete = () => {
    Alert.alert("Remover", "Deseja remover este hábito?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Remover", 
        style: "destructive", 
        onPress: async () => {
          await deleteHabit(habit.id);
          router.back();
        }
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Botão Voltar */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.text} />
          <Text style={{ color: theme.colors.text, marginLeft: 8, fontSize: 16, fontWeight: "600" }}>Voltar</Text>
        </TouchableOpacity>

        {/* Header do Hábito */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: habit.color,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
              shadowColor: habit.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <MaterialCommunityIcons name={habit.icon as any} size={32} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "800" }}>{habit.name}</Text>
            <Text style={{ color: theme.colors.subtext, fontSize: 14 }}>{habit.category}</Text>
          </View>
          <Badge level={ranking.level} />
        </View>

        {/* Card de Progresso */}
        <View style={{ 
          backgroundColor: theme.colors.card, 
          padding: 20, 
          borderRadius: 16, 
          marginBottom: 20,
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <Text style={{ color: theme.colors.subtext, fontSize: 14, marginBottom: 4 }}>Total Acumulado</Text>
          <Text style={{ color: habit.color, fontSize: 40, fontWeight: "800" }}>
            {minutesToHours(habit.totalMinutes).toFixed(1)}h
          </Text>
          <View style={{ marginTop: 12 }}>
            <ProgressBar progress={ranking.progressToNext} color={habit.color} />
            <Text style={{ color: theme.colors.subtext, marginTop: 6, fontSize: 12 }}>
              {(ranking.progressToNext * 100).toFixed(0)}% até o próximo nível
            </Text>
          </View>
        </View>

        {/* Cronômetro */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            ⏱️ Cronômetro
          </Text>
          <TimerControls
            isRunning={timer.state.isRunning}
            elapsedSeconds={timer.state.elapsed}
            onStart={() => timer.start(habit.id)}
            onPause={timer.pause}
            onResume={timer.resume}
            onStop={timer.stop}
          />
        </View>

        {/* Adicionar Tempo Manual */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            ➕ Adicionar Tempo Manual
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Minutos"
              placeholderTextColor={theme.colors.subtext}
              value={manualMinutes}
              onChangeText={setManualMinutes}
              keyboardType="number-pad"
              style={{
                flex: 1,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
                borderWidth: 1,
                borderRadius: 12,
                padding: 14,
                color: theme.colors.text,
                fontSize: 16,
                marginRight: 12,
              }}
            />
            <PrimaryButton label="Salvar" onPress={handleManualAdd} disabled={!manualMinutes} />
          </View>
        </View>

        {/* Sessões Recentes */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            📋 Sessões Recentes
          </Text>
          {habit.sessions.length === 0 ? (
            <View style={{
              backgroundColor: theme.colors.card,
              padding: 24,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor: theme.colors.border
            }}>
              <MaterialCommunityIcons name="clock-outline" size={40} color={theme.colors.subtext} />
              <Text style={{ color: theme.colors.subtext, marginTop: 8 }}>Nenhuma sessão ainda</Text>
            </View>
          ) : (
            habit.sessions.slice(0, 10).map((session) => (
              <View
                key={session.id}
                style={{
                  padding: 14,
                  marginBottom: 10,
                  backgroundColor: theme.colors.card,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 16 }}>
                    {formatMinutes(session.minutes)}
                  </Text>
                  <Text style={{ color: theme.colors.subtext, fontSize: 12, marginTop: 2 }}>
                    {new Date(session.startedAt).toLocaleDateString()} às {new Date(session.startedAt).toLocaleTimeString()}
                  </Text>
                </View>
                {session.manuallyAdded && (
                  <View style={{ 
                    backgroundColor: theme.colors.primary + "20",
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 8
                  }}>
                    <Text style={{ color: theme.colors.primary, fontSize: 11, fontWeight: "600" }}>MANUAL</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Botão Remover */}
        <TouchableOpacity
          onPress={confirmDelete}
          style={{
            backgroundColor: theme.colors.danger + "20",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginBottom: 20,
            borderWidth: 1,
            borderColor: theme.colors.danger
          }}
        >
          <Text style={{ color: theme.colors.danger, fontWeight: "700", fontSize: 16 }}>
            🗑️ Remover Hábito
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};
