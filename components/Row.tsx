import { StyleSheet, View, ViewStyle } from "react-native";

export const Row = ({
  children,
  style,
}: {
  children: any;
  style?: ViewStyle | ViewStyle[];
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
