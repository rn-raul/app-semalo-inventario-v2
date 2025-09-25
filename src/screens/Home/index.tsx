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
export function Home() {
  const { register } = useContext(CountContext);

  const [endereco, setEndereco] = useState("");
  const [codprod, setCodprod] = useState("");
  const [qtdProduct, setQtdProduct] = useState("");
  const [validade, setValidade] = useState("");

  function validateForm() {
    const errors: string[] = [];

    if (!endereco.trim()) errors.push("Endereço é obrigatório");
    if (!codprod.trim()) errors.push("Código do produto é obrigatório");
    if (codprod.length > 3) errors.push("Código deve ter no máximo 3 dígitos");
    if (!qtdProduct.trim()) errors.push("Quantidade é obrigatória");
    if (isNaN(Number(qtdProduct))) errors.push("Quantidade deve ser um número");
    if (!validade) errors.push("Data de validade é obrigatória");

    return errors;
  }
  function handleRegister() {
    const errors = validateForm();
    if (errors.length > 0) {
      return Alert.alert("Aviso", errors.join("\n"));
    }
    register(endereco, codprod, qtdProduct, validade);
    setEndereco("");
    setCodprod("");
    setQtdProduct("");
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
              value={codprod}
              onChangeText={setCodprod}
              keyboardType="numeric"
              editable={!!endereco}
              filled={!!codprod}
            />
            <Input
              placeholder="Quantidade"
              icon="mountain"
              size={24}
              keyboardType="numeric"
              value={qtdProduct}
              onChangeText={setQtdProduct}
              editable={!!codprod}
              filled={!!qtdProduct}
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
