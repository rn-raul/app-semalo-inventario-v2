import { CountDTO } from "@dtos/CountDTO";
import { createContext, useState } from "react";
import api from "@services/api";
import { Alert } from "react-native";


export type CountContextProps = {
  data: CountDTO;
  jsessionid: string;
  setJsessionid: (id: string) => void;
  register: (endereco: string, codprod: string, qtd_product: string, validade: string) => Promise<void>;
};

type CountProviderProps = {
  children: React.ReactNode;
};
export const CountContext = createContext<CountContextProps>(
  {} as CountContextProps
);
export function CountProvider({ children }: CountProviderProps) {
  const [data, setData] = useState<CountDTO>({} as CountDTO);
  const [jsessionid, setJsessionid] = useState("");

  async function register(endereco: string, referencia: string, qtd: string, validade: string) {
    const response = await api.post(
      "/service.sbr?serviceName=DatasetSP.save&outputType=json",
      {
        serviceName: "DatasetSP.save",
        requestBody: {
          entityName: "AD_CONTAGEMAPP",
          standAlone: false,
          fields: [
            "ENDERECO",
            "REFERENCIA",
            "QTD",
            "VALIDADE",
            "DATA",
          ],
          records: [
            {
              values: {
                "0": endereco,
                "1": referencia,
                "2": qtd,
                "3": validade,
                "4": new Date().toLocaleDateString(),
              },
            },
          ],
        },
      }
    );
    Alert.alert("Sucesso", "Contagem registrada com sucesso!");
    console.log("Resultado", response.data);
  }
  return (
    <CountContext.Provider value={{ data, jsessionid, setJsessionid, register }}>
      {children}
    </CountContext.Provider>
  );
}