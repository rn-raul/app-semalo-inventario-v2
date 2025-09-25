import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { useContext, useState } from "react";
import { CountContext } from "@contexts/CountContext";
import { Calendar } from "@components/Calendar";
import api from "@services/api";
export function Home() {
  const { register } = useContext(CountContext);

  const [endereco, setEndereco] = useState("");
  const [referencia, setReferencia] = useState("");
  const [qtd, setQtd] = useState("");
  const [validade, setValidade] = useState("");

  function validateForm() {
    const errors: string[] = [];

    if (!endereco.trim()) errors.push("Endereço é obrigatório");
    if (referencia.length !== 14) errors.push("Referencia deve ter 14 dígitos");
    if (!qtd.trim()) errors.push("Quantidade é obrigatória");
    if (qtd.length > 3) errors.push("Quantidade deve ter no máximo 3 dígitos");
    if (isNaN(Number(qtd))) errors.push("Quantidade deve ser um número");
    if (!validade) errors.push("Data de validade é obrigatória");

    return errors;
  }
  async function checkReference(ref: string) {
    try {
      const response = await api.post(
        "/service.sbr?serviceName=CRUDServiceProvider.loadRecords&outputType=json",
        {
          serviceName: "CRUDServiceProvider.loadRecords",
          requestBody: {
            dataSet: {
              rootEntity: "Produto",
              includePresentationFields: "S",
              offsetPage: "0",
              criteria: {
                expression: { $: "this.REFERENCIA = ?" },
                parameter: [{ $: ref, type: "S" }],
              },
              entity: {
                fieldset: {
                  list: "REFERENCIA, ATIVO",
                },
              },
            },
          },
        }
      );
      const entities = response.data?.responseBody?.entities;
      if (!entities || entities.total === "0") {
        Alert.alert("Aviso", "Verifique o código de referência do produto.");
        return false;
      }
      const fields = entities.metadata.fields.field.map((f: any) => f.name);
      const values = entities.entity;
      const nfData: Record<string, string> = {};
      fields.forEach((field: string, index: number) => {
        nfData[field] = values[`f${index}`]?.["$"];
      });
     if (nfData["ATIVO"] !== "S") {
      Alert.alert("Aviso", "Produto inativo. Não é possível registrar.");
      return false;
    }
      return true;
    } catch (error) {
      console.error("Erro ao buscar referência:", error);
      Alert.alert("Erro", "Não foi possível buscar o produto.");
      return false;
    }
  }
  async function handleRegister() {
    const errors = validateForm();
    if (errors.length > 0) {
      return Alert.alert("Aviso", errors.join("\n"));
    }
    const found = await checkReference(referencia);
    if (!found) {
      return;
    }
    register(endereco, referencia, qtd, validade);
    setEndereco("");
    setReferencia("");
    setQtd("");
    setValidade("");
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "android" ? "padding" : undefined}
      enabled={Platform.OS === "android"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Header />
          <Text style={styles.infoTitle}>Preencha as Informações</Text>

          <View style={styles.form}>
            <Input
              placeholder="Endereço"
              icon="camera"
              size={24}
              value={endereco}
              onChangeText={setEndereco}
              filled={!!endereco}
            />
            <Input
              placeholder="Cod. Produto"
              icon="barcode"
              size={24}
              value={referencia}
              onChangeText={setReferencia}
              keyboardType="numeric"
              editable={!!endereco}
              filled={!!referencia}
            />
            <Input
              placeholder="Quantidade"
              icon="mountain"
              size={24}
              keyboardType="numeric"
              value={qtd}
              onChangeText={setQtd}
              editable={!!referencia}
              filled={!!qtd}
            />
            <Calendar
              title="Validade"
              value={validade}
              onChange={setValidade}
            />
            <Button title="Registrar" onPress={handleRegister} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
