import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/src/services/api";
import { useAuth } from "../../contexts/AuthContext";

import { Header } from "@/components/Header";
import { BotaoAdicionar } from "@/components/BotaoAdicionar";
import { GameCard, Match } from "@/components/GameCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const [partidas, setPartidas] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    buscarPartidas();
  }, []);

  async function buscarPartidas(isRefresh = false) {
    try {
      if (!isRefresh) setIsLoading(true);
      const response = await api.get("/partidas");
      setPartidas(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os jogos do campeonato.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={styles.loadingText}>Buscando partidas do Lobinho...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO */}
      <Header onSair={signOut} />

      {/* BOTÃO */}
      <BotaoAdicionar
        titulo="+ Agendar Nova Partida"
        onPress={() => router.push("/(app)/new-match")}
      />

      {/* LISTA COM OS CARDS */}
      <FlatList
        data={partidas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma partida agendada ainda.</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              buscarPartidas(true);
            }}
            colors={["#0056b3"]}
            tintColor="#0056b3"
          />
        }
        renderItem={({ item }) => (
          <GameCard
            match={item}
            onPress={(match) =>
              router.push({
                pathname: "/(app)/match-details",
                params: { ...match },
              })
            }
          />
        )}
      />
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
  listContainer: { paddingHorizontal: 24, paddingBottom: 24 },
  emptyText: {
    textAlign: "center",
    color: "#999999",
    marginTop: 32,
    fontSize: 16,
  },
});
