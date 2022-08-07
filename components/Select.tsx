import { Picker, PickerItem } from "react-native-woodpicker";
import { ViewStyle, View, StyleSheet, Platform } from "react-native";
import { Text } from "@ui-kitten/components";

import { theme } from "../theme";

export const Select = ({
  label,
  item,
  items,
  onItemChange,
  style,
  isNullable,
  error,
  errorText,
  placeholder,
  onClose,
}: {
  label: string;
  item: PickerItem;
  items: PickerItem[];
  onItemChange: (item: PickerItem, index: number) => void;
  style?: ViewStyle;
  isNullable?: boolean;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  onClose?: () => void;
}) => {
  return (
    <View style={style}>
      <Text appearance={"hint"} category={"c1"} style={styles.label}>
        {label}
      </Text>
      <Picker
        item={item}
        items={items}
        onItemChange={onItemChange}
        onClose={onClose}
        placeholder={placeholder ? placeholder : "Select"}
        isNullable={isNullable}
        containerStyle={
          [
            styles.container,
            {
              borderColor: error
                ? theme["color-danger-500"]
                : theme["color-light-gray"],
            },
          ] as ViewStyle
        }
        textInputStyle={styles.textInput}
      />
      {error ? (
        <Text category="c1" style={styles.errorText}>
          {errorText ? errorText : "Required"}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontWeight: "bold", marginBottom: 5 },
  container: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f7f9fc",
  },
  textInput: {
    marginLeft: 15,
    marginTop: 5,
  },
  errorText: { color: theme["color-danger-500"] },
});
