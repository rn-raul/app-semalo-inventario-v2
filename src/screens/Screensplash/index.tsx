import { View, Image, Text } from "react-native";
import { styles } from "./styles";
export function Screensplash() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Uma app by:</Text>
            <Image 
            source={require("@assets/Logo.png")} 
            style={styles.logo}
            />
        </View>
    )
}