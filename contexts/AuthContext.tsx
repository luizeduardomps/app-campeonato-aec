import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextData {
  user: any;
  signIn: (token: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosSalvos() {
      try {
        const storedToken = await AsyncStorage.getItem("@App:token");
        const storedUser = await AsyncStorage.getItem("@App:user");

        if (storedToken && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados de login:", error);
      } finally {
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
    setUser(null);
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
