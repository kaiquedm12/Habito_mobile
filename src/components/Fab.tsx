import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeProvider";

interface Props {
  icon: string;
  onPress: () => void;
}

export const Fab: React.FC<Props> = ({ icon, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
        elevation: 4,
      }}
    >
      <MaterialCommunityIcons name={icon as any} size={26} color="#0b1224" />
    </TouchableOpacity>
  );
};
