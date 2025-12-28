import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/theme/ThemeProvider";

export const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={{ paddingTop: 80, paddingBottom: 40, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
      >
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="trophy" size={64} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800", marginTop: 12 }}>Habito</Text>
          <Text style={{ color: "#fff", opacity: 0.9, marginTop: 4 }}>Construa seus hábitos, conquiste suas metas</Text>
        </View>
      </LinearGradient>

      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "700", marginBottom: 24 }}>Bem-vindo!</Text>

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
          disabled={loading || !email.trim() || !password.trim()}
          onPress={handleLogin}
          style={{
            backgroundColor: theme.colors.primary,
            padding: 18,
            borderRadius: 12,
            alignItems: "center",
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
          <Text style={{ color: theme.colors.subtext }}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
