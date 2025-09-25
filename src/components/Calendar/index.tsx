import { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View } from "react-native";
import { Input } from "../Input";
import { StyleSheet } from "react-native";

type Props = {
  title: string;
  value?: string;
  onChange?: (date: string) => void;
};

export function Calendar({ title, value, onChange }: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Sincroniza o estado interno com o valor externo
  useEffect(() => {
    setSelectedDate(value || "");
  }, [value]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    if (typeof date === "object" && date instanceof Date) {
      const formatted = date.toLocaleDateString();
      setSelectedDate(formatted);
      if (typeof onChange === "function") {
        onChange(formatted);
      }
    }
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder={title}
        icon="calendar"
        value={selectedDate}
        onFocus={showDatePicker}
        onChangeText={setSelectedDate}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});