import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { Icon, IconProps } from "../Icon";
import theme from "@theme/index";
type Props = TextInputProps & {
  icon: IconProps["name"];
  size?: number;
  filled?: boolean;
};

export function Input({ icon, size, filled, ...rest }: Props) {
  return (
    <View
      style={[
        styles.container,
        { borderColor: filled ? theme.colors.orange : "#ff0202ff" },
      ]}
    >    
      <Icon name={icon} size={size} />
      <TextInput 
      style={styles.input} 
      placeholderTextColor={theme.colors.gray}
      {...rest} />
    </View>
  );
}