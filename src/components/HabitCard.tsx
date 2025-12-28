import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Habit } from "@/types/habit";
import { useTheme } from "@/theme/ThemeProvider";
import { formatMinutes } from "@/utils/time";
import { ProgressBar } from "./ProgressBar";
import { getRanking } from "@/services/rankingService";
import { Badge } from "./Badge";

interface Props {
  habit: Habit;
  onPress?: () => void;
}

export const HabitCard: React.FC<Props> = ({ habit, onPress }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const ranking = getRanking(habit.totalMinutes);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/habit/${habit.id}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: habit.color,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
            shadowColor: habit.color,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <MaterialCommunityIcons name={habit.icon as any} size={28} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 16 }}>{habit.name}</Text>
          <Text style={{ color: theme.colors.subtext }}>{habit.category}</Text>
        </View>
        <Badge level={ranking.level} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
        <Text style={{ color: theme.colors.subtext }}>Total</Text>
        <Text style={{ color: theme.colors.text, fontWeight: "600" }}>{formatMinutes(habit.totalMinutes)}</Text>
      </View>
      <ProgressBar progress={ranking.progressToNext} color={habit.color} />
      <Text style={{ color: theme.colors.subtext, marginTop: 6 }}>
        Evolução até o próximo nível: {(ranking.progressToNext * 100).toFixed(0)}%
      </Text>
    </TouchableOpacity>
  );
};
