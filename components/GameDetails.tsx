import { View, Text, StyleSheet } from "react-native";

interface PlacarProps {
  timeA: string;
  timeB: string;
}

export function GameDetails({ timeA, timeB }: PlacarProps) {
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.team}>{timeA}</Text>
      <Text style={styles.vs}>X</Text>
      <Text style={styles.team}>{timeB}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 16,
  },
  team: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  vs: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0056b3",
    marginHorizontal: 16,
  },
});
