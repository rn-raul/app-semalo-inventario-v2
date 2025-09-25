import { StyleSheet } from "react-native";
import theme from "@theme/index";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 9,
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    borderRadius: 9,
    width: "100%",
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.orange,
  },
});