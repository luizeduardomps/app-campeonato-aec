import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  async function handleSignIn() {
    if (!email.trim() || !password.trim()) {
      const errorMsg = "Por favor, preencha todos os campos.";
      Platform.OS === "web"
        ? window.alert(errorMsg)
        : Alert.alert("Atenção", errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      // Simula o tempo de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simula um token e dados do usuário retornados pelo backend
      const fakeToken = "mock-jwt-token-123456";
      const userData = {
        id: "1",
        email: email,
      };

      await signIn(fakeToken, userData);
    } catch (error) {
      console.log(error);

      const apiErrorMsg = "Falha ao realizar login. Tente novamente.";
      Platform.OS === "web"
        ? window.alert(apiErrorMsg)
        : Alert.alert("Erro", apiErrorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AEC</Text>
      <Text style={styles.subtitle}>Gestão do Campeonato Futebol 7</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0056b3",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
  },
});
