import { StyleSheet } from "react-native";
import theme from "@theme/index";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    backgroundColor: theme.colors.orange,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
});
