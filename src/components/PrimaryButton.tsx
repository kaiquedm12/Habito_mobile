import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ label, onPress, disabled }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: disabled ? theme.colors.muted : theme.colors.primary,
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#0b1224", fontWeight: "700" }}>{label}</Text>
    </TouchableOpacity>
  );
};
