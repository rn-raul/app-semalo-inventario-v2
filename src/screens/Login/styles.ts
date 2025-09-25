import theme from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    }
})