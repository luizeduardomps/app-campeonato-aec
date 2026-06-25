import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/src/services/api";

import { GameCard, Match } from "@/components/GameCard";
import { BotaoAcao } from "@/components/BotaoAcao";

export default function TelaPublicaScreen() {
  const router = useRouter();

  const [partidas, setPartidas] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    buscarPartidasPublicas();
  }, []);

  async function buscarPartidasPublicas(isRefresh = false) {
    try {
      if (!isRefresh) setIsLoading(true);
      const response = await api.get("/partidas");
      setPartidas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={styles.loadingText}>
          Carregando tabela do campeonato...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Tabela Oficial</Text>
          <Text style={styles.subtitle}>1° Campeonato Fut7 - AEC</Text>
        </View>
        <View style={{ width: 100 }}>
          <BotaoAcao
            titulo="Entrar"
            corBase="#0056b3"
            onPress={() => router.push("/login")}
          />
        </View>
      </View>

      {/* LISTAGEM DOS JOGOS */}
      <FlatList
        data={partidas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum jogo agendado no momento.</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              buscarPartidasPublicas(true);
            }}
            colors={["#0056b3"]}
          />
        }
        renderItem={({ item }) => <GameCard match={item} showDetails={false} />}
      />

      <Text style={styles.footerText}>
        Acompanhe os jogos na Nova Sede Esportiva!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
  loadingText: { marginTop: 12, fontSize: 16, color: "#666666" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 14, color: "#666" },
  listContainer: { paddingHorizontal: 24, paddingBottom: 24 },
  emptyText: {
    textAlign: "center",
    color: "#999999",
    marginTop: 32,
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    color: "#28A745",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 16,
    fontStyle: "italic",
  },
});
