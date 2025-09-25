import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { Icon } from "../Icon";
import api from "@services/api";
import { useNavigation } from "@react-navigation/native";
import { useSessionRenewal } from "@hooks/userSession";

export function Header() {
  const data = new Date();
  const { user, signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá,{user?.user ? user.user.toUpperCase() : ""}</Text>
        <TouchableOpacity onPress={signOut}>
          <Icon name="log-out" />
        </TouchableOpacity>
      </View>
      <Text style={styles.date}>
        Data Contagem: {data.toLocaleDateString()}
      </Text>
    </View>
  );
}
