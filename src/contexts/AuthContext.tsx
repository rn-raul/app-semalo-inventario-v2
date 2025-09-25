import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState, useEffect } from "react";
import api from "@services/api";
import { Alert } from "react-native";
import { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSessionRenewal } from "@hooks/userSession";

export type AuthContextProps = {
  user: UserDTO;
  jsessionid: string;
  setJsessionid: (id: string) => void;
  signIn: (user: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  startSessionRenewal: () => void;
  stopSessionRenewal: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [jsessionid, setJsessionid] = useState("");
  
  // Hook para gerenciar renovação de sessão (ÚNICA INSTÂNCIA)
  const { startSessionRenewal, stopSessionRenewal, cleanup } = useSessionRenewal();

  const signIn = async (username: string, password: string) => {
    let config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (jsessionid !== "") {
      config = {
        ...config,
        headers: { ...config.headers, Cookie: `JSESSIONID=${jsessionid}` },
      };
    }
    
    const requestBody = {
      serviceName: "MobileLoginSP.Login",
      requestBody: {
        NOMUSU: { $: username.toUpperCase() },
        INTERNO: { $: password },
        KEEPCONNECTED: { $: "N" },
      },
    };

    let newToken = "";
    if (jsessionid !== "") newToken = `&mgeSession=${jsessionid}`;

    const url = `/service.sbr?serviceName=MobileLoginSP.login&outputType=json${newToken}`;

    try {
      const response = await api.post(url, requestBody, config);
      const jsessionidFromResponse = response.data.responseBody?.jsessionid?.$;
      
      if (jsessionidFromResponse) {
        await AsyncStorage.setItem("@JSESSIONID", jsessionidFromResponse);
        setJsessionid(jsessionidFromResponse);
      }
      
      setUser({ user: username, password: password });
      console.log("Resultado", response.data);
      
      if (response.data.status === "1") {
        navigation.navigate("Home");
        console.log(`jsessionid: ${jsessionidFromResponse}`);
        
        // Iniciar renovação automática da sessão após login bem-sucedido
        startSessionRenewal();
      } else {
        Alert.alert(
          "Erro ao logar",
          response.data.statusMessage
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Dados Incorretos",
        error?.response?.data?.statusMessage || "Verifique usuário e senha."
      );
    }
  };

  const signOut = async () => {
    try {
      // Parar renovação automática da sessão PRIMEIRO
      console.log('Parando renovação da sessão...');
      stopSessionRenewal();
      
      const response = await api.post(
        "/service.sbr?serviceName=MobileLoginSP.logout&outputType=json",
        {
          serviceName: "MobileLoginSP.logout",
          status: "1",
          pendingPrinting: "false",
        }
      );
      
      if (response.data.status === "1") {
        // Limpar dados do usuário e sessão
        setUser({} as UserDTO);
        setJsessionid("");
        await AsyncStorage.removeItem("@JSESSIONID");
        
        Alert.alert("Logout realizado com sucesso!");
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Erro ao fazer logout");
      console.log("Erro ao fazer logout:", error);
    }
  };

  // Cleanup quando o componente for desmontado
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      jsessionid, 
      setJsessionid, 
      signIn, 
      signOut,
      startSessionRenewal,
      stopSessionRenewal
    }}>
      {children}
    </AuthContext.Provider>
  );
}