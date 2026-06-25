import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function BotaoCustomizado({
  titulo,
  onPress,
}: {
  titulo: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.botao}
      testID="botao-customizado"
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: { backgroundColor: "#0056b3", padding: 12, borderRadius: 8 },
  texto: { color: "#FFF", fontWeight: "bold", textAlign: "center" },
});
