import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeProvider";

interface Props {
  isRunning: boolean;
  elapsedSeconds: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const formatElapsed = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const TimerControls: React.FC<Props> = ({ isRunning, elapsedSeconds, onStart, onPause, onResume, onStop }) => {
  const { theme } = useTheme();
  return (
    <View style={{ padding: 16, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16 }}>
      <Text style={{ fontSize: 32, fontWeight: "700", color: theme.colors.text, textAlign: "center" }}>
        {formatElapsed(elapsedSeconds)}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        {!isRunning && elapsedSeconds === 0 && (
          <ActionButton icon="play" label="Iniciar" color={theme.colors.primary} onPress={onStart} />
        )}
        {isRunning && <ActionButton icon="pause" label="Pausar" color={theme.colors.warning} onPress={onPause} />}
        {!isRunning && elapsedSeconds > 0 && (
          <ActionButton icon="play" label="Retomar" color={theme.colors.primary} onPress={onResume} />
        )}
        {elapsedSeconds > 0 && <ActionButton icon="stop" label="Finalizar" color={theme.colors.danger} onPress={onStop} />}
      </View>
    </View>
  );
};

const ActionButton: React.FC<{ icon: string; label: string; color: string; onPress: () => void }> = ({ icon, label, color, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, backgroundColor: color, padding: 12, borderRadius: 12, alignItems: "center", marginHorizontal: 4 }}
    >
      <MaterialCommunityIcons name={icon as any} color="#0b1224" size={20} />
      <Text style={{ color: "#0b1224", fontWeight: "700", marginTop: 4 }}>{label}</Text>
    </TouchableOpacity>
  );
};
