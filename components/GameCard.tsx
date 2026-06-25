// src/components/CardPartida.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface Match {
  id: string;
  timeA: string;
  timeB: string;
  data: string;
  local: string;
}

interface GameCard {
  match: Match;
  onPress?: (match: Match) => void;
  showDetails?: boolean;
}

export function GameCard({ match, onPress, showDetails = true }: GameCard) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={showDetails ? 0.7 : 1}
      onPress={() => onPress && onPress(match)}
      disabled={!showDetails}
    >
      <View style={styles.matchContainer}>
        <Text style={styles.time}>{match.timeA}</Text>
        <Text style={styles.vs}>X</Text>
        <Text style={styles.time}>{match.timeB}</Text>
      </View>

      <View style={styles.separador} />

      <View style={styles.infoRow}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>📅 Data: {match.data}</Text>
          <Text style={styles.infoText}>📍 Local: {match.local}</Text>
        </View>

        {showDetails && <Text style={styles.verMaisText}>Detalhes {">"}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
    textAlign: "center",
  },
  vs: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#999999",
    marginHorizontal: 12,
  },
  separador: { height: 1, backgroundColor: "#E0E0E0", marginBottom: 12 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  infoContainer: { gap: 4, flex: 1 },
  infoText: { fontSize: 14, color: "#555555" },
  verMaisText: { fontSize: 14, color: "#0056b3", fontWeight: "bold" },
});
