import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/src/services/api";

import { CampoEntrada } from "@/components/CampoEntrada";
import { BotaoAcao } from "@/components/BotaoAcao";
import { validateMatchup } from "@/src/utils/validations";

export default function EditMatchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [timeA, setTimeA] = useState(String(params.timeA || ""));
  const [timeB, setTimeB] = useState(String(params.timeB || ""));
  const [data, setData] = useState(String(params.data || ""));
  const [local, setLocal] = useState(String(params.local || ""));
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSalvarAlteracoes() {
    if (!timeA.trim() || !timeB.trim() || !data.trim() || !local.trim()) {
      Alert.alert("Atenção", "Nenhum campo pode ficar vazio.");
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
      await api.put(`/partidas/${params.id}`, { timeA, timeB, data, local });
      Alert.alert("Sucesso!", "Os dados do confronto foram atualizados.");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar a partida.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Confronto</Text>

      <View style={styles.form}>
        <CampoEntrada label="Time A" value={timeA} onChangeText={setTimeA} />
        <CampoEntrada label="Time B" value={timeB} onChangeText={setTimeB} />
        <CampoEntrada
          label="Data e Horário"
          value={data}
          onChangeText={setData}
        />
        <CampoEntrada label="Local" value={local} onChangeText={setLocal} />

        <View style={styles.botoesContainer}>
          <BotaoAcao
            titulo="Salvar Alterações"
            corBase="#0056b3"
            onPress={handleSalvarAlteracoes}
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
