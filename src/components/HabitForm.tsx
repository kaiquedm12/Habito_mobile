import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";
import { Habit } from "@/types/habit";
import { PrimaryButton } from "./PrimaryButton";
import { IconPicker } from "./IconPicker";

interface Props {
  initial?: Partial<Habit>;
  onSubmit: (habit: Partial<Habit>) => Promise<void> | void;
  submitLabel?: string;
}

const COLOR_OPTIONS = ["#6366f1", "#22c55e", "#eab308", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

export const HabitForm: React.FC<Props> = ({ initial, onSubmit, submitLabel = "Salvar" }) => {
  const { theme } = useTheme();
  const [name, setName] = useState(initial?.name ?? "");
  const [color, setColor] = useState(initial?.color ?? "#6366f1");
  const [category, setCategory] = useState(initial?.category ?? "Produtividade");
  const [targetHours, setTargetHours] = useState(initial?.targetHours?.toString() ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "star");

  const handleSubmit = () => {
    onSubmit({ name, color, category, targetHours: targetHours ? Number(targetHours) : undefined, icon });
    setName("");
    setTargetHours("");
  };

  const inputStyle = {
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    marginBottom: 10,
  } as const;

  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ color: theme.colors.text, fontWeight: "700", marginBottom: 16, fontSize: 18 }}>Criar novo hábito</Text>
      
      <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600" }}>Nome</Text>
      <TextInput placeholder="Ex: Correr, Estudar..." placeholderTextColor={theme.colors.subtext} value={name} onChangeText={setName} style={inputStyle} />
      
      <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600", marginTop: 12 }}>Ícone</Text>
      <IconPicker selected={icon} onSelect={setIcon} />
      
      <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600", marginTop: 12 }}>Cor</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {COLOR_OPTIONS.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setColor(c)}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: c,
              marginRight: 12,
              borderWidth: color === c ? 4 : 2,
              borderColor: color === c ? theme.colors.text : theme.colors.border,
            }}
          />
        ))}
      </ScrollView>

      <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600" }}>Categoria</Text>
      <TextInput placeholder="Ex: Saúde, Produtividade..." placeholderTextColor={theme.colors.subtext} value={category} onChangeText={setCategory} style={inputStyle} />
      
      <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600", marginTop: 12 }}>Meta (horas, opcional)</Text>
      <TextInput
        placeholder="Ex: 30"
        placeholderTextColor={theme.colors.subtext}
        value={targetHours}
        onChangeText={setTargetHours}
        keyboardType="number-pad"
        style={inputStyle}
      />
      <PrimaryButton label={submitLabel} onPress={handleSubmit} disabled={!name.trim()} />
    </View>
  );
};
