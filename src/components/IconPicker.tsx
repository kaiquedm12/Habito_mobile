import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeProvider";
import { ICON_OPTIONS } from "@/utils/icons";

interface Props {
  selected: string;
  onSelect: (icon: string) => void;
}

export const IconPicker: React.FC<Props> = ({ selected, onSelect }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const selectedLabel = ICON_OPTIONS.find((i) => i.name === selected)?.label ?? "Escolher ícone";

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          padding: 14,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <MaterialCommunityIcons name={selected as any} size={24} color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginLeft: 12, flex: 1 }}>{selectedLabel}</Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color={theme.colors.subtext} />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
          <View
            style={{
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingTop: 20,
              maxHeight: "70%",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 12 }}>
              <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700" }}>Escolha um ícone</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={ICON_OPTIONS}
              numColumns={4}
              keyExtractor={(item) => item.name}
              contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.name);
                    setVisible(false);
                  }}
                  style={{
                    flex: 1,
                    margin: 8,
                    aspectRatio: 1,
                    backgroundColor: selected === item.name ? theme.colors.primary : theme.colors.card,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: selected === item.name ? theme.colors.primary : theme.colors.border,
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.name as any}
                    size={32}
                    color={selected === item.name ? "#fff" : theme.colors.text}
                  />
                  <Text
                    style={{
                      color: selected === item.name ? "#fff" : theme.colors.subtext,
                      fontSize: 10,
                      marginTop: 4,
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
