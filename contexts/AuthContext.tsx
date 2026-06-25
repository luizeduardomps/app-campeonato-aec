import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: any;
  signIn: (token: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // 1. Iniciamos o loading como TRUE para segurar o app na tela preta/splash
  // enquanto procuramos o token no fundo da gaveta.
  const [isLoading, setIsLoading] = useState(true);

  // 2. Este useEffect roda automaticamente quando o app abre
  useEffect(() => {
    async function carregarDadosSalvos() {
      try {
        const storedToken = await AsyncStorage.getItem("@App:token");
        const storedUser = await AsyncStorage.getItem("@App:user");

        // Se achou o token e o usuário, faz o login silencioso!
        if (storedToken && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados de login:", error);
      } finally {
        // 3. Terminou de procurar? Libera a tela.
        setIsLoading(false);
      }
    }

    carregarDadosSalvos();
  }, []);

  async function signIn(token: string, userData: any) {
    await AsyncStorage.setItem("@App:token", token);
    await AsyncStorage.setItem("@App:user", JSON.stringify(userData));
    setUser(userData);
  }

  async function signOut() {
    await AsyncStorage.removeItem("@App:token");
    await AsyncStorage.removeItem("@App:user");
    setUser(null); // Isso aqui avisa o roteador para expulsar o usuário para o Login
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
