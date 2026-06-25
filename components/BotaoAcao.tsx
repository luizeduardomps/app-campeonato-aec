import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface BotaoAcaoProps {
  titulo: string;
  onPress: () => void;
  corBase?: string;
  outline?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export function BotaoAcao({
  titulo,
  onPress,
  corBase = "#0056b3",
  outline = false,
  isLoading = false,
  disabled = false,
}: BotaoAcaoProps) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        { backgroundColor: outline ? "transparent" : corBase },
        outline && { borderWidth: 1, borderColor: corBase },
        (disabled || isLoading) && { opacity: 0.6 },
        { width: "100%" },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={outline ? corBase : "#FFF"} />
      ) : (
        <Text style={[styles.texto, { color: outline ? corBase : "#FFF" }]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 50,
    justifyContent: "center",
  },
  texto: { fontSize: 16, fontWeight: "bold" },
});
