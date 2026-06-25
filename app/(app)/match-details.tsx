import { View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "@/src/services/api";

import { GameDetails } from "@/components/GameDetails";
import { InfoLinha } from "@/components/InfoLinha";
import { BotaoAcao } from "@/components/BotaoAcao";

export default function DetalhesPartidaScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  async function handleDelete() {
    Alert.alert(
      "Cancelar Confronto",
      "Deseja excluir definitivamente esta partida?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/partidas/${params.id}`);
              Alert.alert("Sucesso", "Partida cancelada com sucesso.");
              router.back();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a partida.");
            }
          },
        },
      ],
    );
  }

  function handleEdit() {
    router.push({
      pathname: "/(app)/edit-match",
      params: { ...params },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Confronto</Text>

      <View style={styles.cardInfo}>
        <Text style={styles.headerText}>1° Campeonato Fut7</Text>

        {/* PLACAR */}
        <GameDetails
          timeA={String(params.timeA)}
          timeB={String(params.timeB)}
        />

        <View style={styles.separador} />

        {/* INFORMAÇÃO */}
        <InfoLinha
          icone="🗓️"
          label="Data e Horário:"
          valor={String(params.data)}
        />
        <InfoLinha
          icone="🏟️"
          label="Local da Partida:"
          valor={String(params.local)}
        />

        <View style={styles.separador} />
        <Text style={styles.mascoteText}>
          Presença confirmada do Lobinho da AEC!
        </Text>
      </View>

      {/* BOTÕES LADO A LADO */}
      <View style={styles.actionContainer}>
        <View style={{ flex: 1 }}>
          <BotaoAcao
            titulo="✏️ Editar"
            corBase="#FFC107"
            onPress={handleEdit}
          />
        </View>
        <View style={{ width: 12 }} />
        <View style={{ flex: 1 }}>
          <BotaoAcao
            titulo="🗑️ Excluir"
            corBase="#FF3B30"
            onPress={handleDelete}
          />
        </View>
      </View>

      {/* BOTÃO VOLTAR */}
      <View style={{ marginTop: 24 }}>
        <BotaoAcao
          titulo="Voltar para a Lista"
          corBase="#0056b3"
          outline
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0056b3",
    marginBottom: 24,
    marginTop: 16,
  },
  cardInfo: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  separador: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
    marginVertical: 16,
  },
  mascoteText: {
    fontSize: 14,
    color: "#28A745",
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 8,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
});
