import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/src/services/api";

import { CampoEntrada } from "@/components/CampoEntrada";
import { BotaoAcao } from "@/components/BotaoAcao";
import { validateMatchup } from "@/src/utils/validations";

export default function NewMatchScreen() {
  const router = useRouter();

  const [timeA, setTimeA] = useState("");
  const [timeB, setTimeB] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("Nova Sede Esportiva AEC");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSalvar() {
    if (!timeA.trim() || !timeB.trim() || !data.trim() || !local.trim()) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha todos os campos para agendar o confronto.",
      );
      return;
    }

    if (!validateMatchup(timeA, timeB)) {
      Alert.alert(
        "Confronto Inválido",
        "Um time não pode jogar contra ele mesmo.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await api.post("/partidas", { timeA, timeB, data, local });
      Alert.alert(
        "Sucesso!",
        "A partida do Lobinho foi agendada e salva no banco de dados!",
      );
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Não foi possível salvar a partida. Verifique sua conexão.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Agendar Confronto</Text>

      <View style={styles.form}>
        <CampoEntrada
          label="Time A (Mandante)"
          value={timeA}
          onChangeText={setTimeA}
        />

        <CampoEntrada
          label="Time B (Visitante)"
          value={timeB}
          onChangeText={setTimeB}
        />

        <CampoEntrada
          label="Data e Horário"
          value={data}
          onChangeText={setData}
        />

        <CampoEntrada
          label="Local da Partida"
          value={local}
          onChangeText={setLocal}
        />

        <View style={styles.botoesContainer}>
          <BotaoAcao
            titulo="Salvar Partida"
            corBase="#28A745"
            onPress={handleSalvar}
            isLoading={isSubmitting}
          />
          <View style={{ height: 12 }} />
          <BotaoAcao
            titulo="Cancelar"
            corBase="#FF3B30"
            outline
            onPress={() => router.back()}
            disabled={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", paddingHorizontal: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0056b3",
    marginBottom: 24,
    marginTop: 16,
  },
  form: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botoesContainer: { marginTop: 8, flexDirection: "column" },
});
