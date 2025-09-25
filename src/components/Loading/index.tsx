import { ActivityIndicator, View } from "react-native";
import theme from "@theme/index";
export function Loading(){
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={theme.colors.orange} />
        </View>
    )
}