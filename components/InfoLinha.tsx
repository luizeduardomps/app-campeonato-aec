import { View, Text, StyleSheet } from "react-native";

interface InfoLinhaProps {
  icone: string;
  label: string;
  valor: string;
}

export function InfoLinha({ icone, label, valor }: InfoLinhaProps) {
  return (
    <View style={styles.detalheRow}>
      <Text style={styles.detalheLabel}>
        {icone} {label}
      </Text>
      <Text style={styles.detalheValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detalheRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  detalheLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginRight: 16,
  },
  detalheValor: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    flexShrink: 1,
    textAlign: "right",
  },
});
