import { View, StyleSheet, Pressable, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

import { theme } from "../theme";
import { Row } from "./Row";

export const TouchableStarsContainer = ({
  stars,
  field,
  setStars,
  style,
}: {
  stars: number;
  field: string;
  setStars: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  style?: ViewStyle | ViewStyle[];
}) => {
  const starText = ["poor", "ok", "good", "great", "excellent"];

  const starsComponent = [1, 2, 3, 4, 5].map((item, index) => {
    let name = "star-outline";
    if (index <= stars - 1) name = "star";

    return (
      <Pressable key={item} onPress={() => setStars(field, item)}>
        <MaterialCommunityIcons
          name={name as "star"}
          size={32}
          color={theme["color-primary-500"]}
        />
      </Pressable>
    );
  });

  return (
    <View style={[styles.container, style]}>
      <Row>{starsComponent}</Row>
      <Text category={"c1"}>{`This property is ${starText[stars - 1]}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: theme["color-gray"],
  },
});
