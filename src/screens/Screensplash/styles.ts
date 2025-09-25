import { StyleSheet } from "react-native";

import theme from "@theme/index";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.white,
        gap: 9
    },
    title: {
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        color: theme.colors.black,
    },
    logo: {
        width: 209,
        height: 109,
        resizeMode: "contain"
    }
})