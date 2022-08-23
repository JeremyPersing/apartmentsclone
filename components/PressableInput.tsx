import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { Text } from "@ui-kitten/components";

export const PressableInput = ({
  onPress,
  label,
  placeholder,
  value,
  style,
}: {
  onPress: () => void;
  label?: string;
  placeholder?: string;
  value?: any;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={style}>
      <Text style={styles.label} category={"label"} appearance={"hint"}>
        {label}
      </Text>
      <Pressable onPress={onPress} style={styles.input}>
        <Text style={styles.text}>
          {value ? value : placeholder ? placeholder : ""}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { paddingVertical: 5 },
  input: {
    borderColor: "#e8e8e8",
    borderRadius: 3,
    borderWidth: 1,
    height: 40,
    paddingLeft: 15,
    backgroundColor: "#f7f9fc",
  },
  text: { marginTop: 7 },
});
