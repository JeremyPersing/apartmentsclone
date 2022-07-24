import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import { theme } from "../theme";

export const GeneralTextCard = ({
  heading,
  body,
  style,
}: {
  heading: string;
  body: string[];
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text category={"c1"} style={styles.heading}>
        {heading}
      </Text>
      {body.map((item) => (
        <Text category={"c1"} key={item}>
          {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme["color-gray"],
  },
  heading: {
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingVertical: 4,
  },
});
