import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

import { theme } from "../theme";

export const UnitButton = ({
  active,
  text,
  iconName,
  onPress,
}: {
  active: boolean;
  text: string;
  iconName: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.unitButton,
        {
          borderColor: active
            ? theme["color-primary-500"]
            : theme["color-gray"],
          shadowColor: active ? theme["color-primary-200"] : "",
          shadowOffset: {
            width: 0,
            height: active ? 2 : 0,
          },
          shadowOpacity: active ? 0.23 : 0,
          shadowRadius: active ? 2.62 : 0,
          elevation: active ? 4 : 0,
        },
      ]}
    >
      <MaterialIcons
        name={iconName}
        size={28}
        color={active ? theme["color-primary-500"] : "black"}
      />
      <Text
        category={"s1"}
        style={{
          paddingTop: 5,
          color: active ? theme["color-primary-500"] : "black",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unitButton: {
    borderRadius: 5,
    borderWidth: 1,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    marginVertical: 20,
  },
});
