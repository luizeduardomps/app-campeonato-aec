import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface BotaoAdicionarProps {
  titulo: string;
  onPress: () => void;
}

export function BotaoAdicionar({ titulo, onPress }: BotaoAdicionarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{titulo}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, marginBottom: 16 },
  button: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  text: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
