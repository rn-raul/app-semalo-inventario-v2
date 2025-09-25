import { StyleSheet } from "react-native";
import theme from "@theme/index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    marginTop: 23,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.gray,
    marginBottom: 23
  },
  infoTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    alignSelf: "center",
    marginBottom: 23
  },
  form: {
    width: '100%',
    gap: 16,
  }
});