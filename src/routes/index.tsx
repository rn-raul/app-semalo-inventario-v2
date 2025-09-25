import { NavigationContainer } from "@react-navigation/native";
import { StackRouter } from "./StackRouter";
import { AuthProvider } from "@contexts/AuthContext";
import { CountProvider } from "@contexts/CountContext";
export function Routes() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CountProvider>
      <StackRouter />
      </CountProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}