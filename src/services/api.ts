// services/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Criamos a instância principal do Axios
export const api = axios.create({
  // Aqui vai o link do banco de dados onde ficarão as tabelas do campeonato de Futebol 7
  baseURL: "https://6a3b3833e4a07f202e14af2b.mockapi.io/api/aeccamp",
  timeout: 5000, // Se o servidor demorar mais de 5 segundos, ele cancela e dá erro
});

// 2. Criamos o Interceptador (O "Pedaço Inteligente")
api.interceptors.request.use(
  async (config) => {
    try {
      // Antes de qualquer requisição sair do app, ele pega o token no AsyncStorage
      const token = await AsyncStorage.getItem("@App:token");

      // Se o usuário estiver logado, ele anexa o token na requisição
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
