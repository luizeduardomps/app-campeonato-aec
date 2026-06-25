import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderProps {
  onSair: () => void;
}

export function Header({ onSair }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>1° Campeonato Fut7</Text>
        <Text style={styles.subtitle}>Próximos Confrontos</Text>
      </View>
      <TouchableOpacity onPress={onSair} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#0056b3" },
  subtitle: { fontSize: 16, color: "#666666" },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
