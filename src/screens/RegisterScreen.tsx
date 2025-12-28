import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/theme/ThemeProvider";

export const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await register(name, email, password);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient
        colors={[theme.colors.secondary, theme.colors.primary]}
        style={{ paddingTop: 80, paddingBottom: 40, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
      >
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="account-plus" size={64} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800", marginTop: 12 }}>Criar Conta</Text>
          <Text style={{ color: "#fff", opacity: 0.9, marginTop: 4 }}>Comece sua jornada agora</Text>
        </View>
      </LinearGradient>

      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600" }}>Nome</Text>
          <TextInput
            placeholder="Seu nome"
            placeholderTextColor={theme.colors.subtext}
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              color: theme.colors.text,
              fontSize: 16,
            }}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600" }}>Email</Text>
          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor={theme.colors.subtext}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              color: theme.colors.text,
              fontSize: 16,
            }}
          />
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: theme.colors.subtext, marginBottom: 8, fontWeight: "600" }}>Senha</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={theme.colors.subtext}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              color: theme.colors.text,
              fontSize: 16,
            }}
          />
        </View>

        <TouchableOpacity
          disabled={loading || !name.trim() || !email.trim() || !password.trim()}
          onPress={handleRegister}
          style={{
            backgroundColor: theme.colors.secondary,
            padding: 18,
            borderRadius: 12,
            alignItems: "center",
            shadowColor: theme.colors.secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            {loading ? "Criando..." : "Criar conta"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
          <Text style={{ color: theme.colors.subtext }}>Já tem conta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
