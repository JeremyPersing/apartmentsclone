import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

import { theme } from "../theme";

export const RecentSearchButton = ({
  name,
  onPress,
  style,
}: {
  name: string;
  onPress?: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <MaterialCommunityIcons
        name="clock-time-three-outline"
        size={24}
        color={theme["color-primary-500"]}
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: { marginLeft: 10 },
});
