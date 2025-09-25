import { StyleSheet } from "react-native";
import theme from "@theme/index";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 26,
    marginBottom: 26,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.gray,
  },
  date: {
    fontSize: 18,
    color: theme.colors.gray,
  },
});
