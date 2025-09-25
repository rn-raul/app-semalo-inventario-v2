import {
  View,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";
import logo from "@assets/log_box.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
export function Login() {
  const { signIn } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!user || !password) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos.");
      return;
    }
    setIsLoading(true);
    try {
      await signIn(user, password);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff"  }}
      behavior={Platform.OS === "android" ? "padding" : undefined}
      enabled={Platform.OS === "android"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image style={{ width: 110, height: 110 }} source={logo} />
          <Input
            placeholder="Usuário"
            icon="user"
            value={user}
            onChangeText={setUser}
          />
          <Input
            placeholder="Senha"
            icon="rectangle"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title={isLoading ? "Entrando..." : "Entrar"}
            onPress={handleLogin}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
