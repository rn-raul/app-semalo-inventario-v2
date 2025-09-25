import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@screens/Login";
import { Home } from "@screens/Home";
import { Screensplash } from "@screens/Screensplash";
import React, { useEffect, useState } from "react";
const Stack = createNativeStackNavigator();

export function StackRouter() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 2 segundos
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Screensplash />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}