import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Row } from "./Row";
import { theme } from "../theme";
import { Score } from "../types/score";
import { openURL } from "../utils/openURL";

export const ScoreCard = ({
  score,
  style,
}: {
  score: Score;
  style?: ViewStyle | ViewStyle[];
}) => {
  const handlePress = () => {
    const url = "https://www.redfin.com/how-walk-score-works";
    openURL(url);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        pressed
          ? [styles.container, style, styles.activeBackground]
          : [styles.container, style]
      }
    >
      <Row style={styles.row}>
        <Text category={"h6"} style={styles.mainText}>
          {score.type} Score
          <MaterialCommunityIcons
            name={"registered-trademark"}
            size={16}
            color={"black"}
          />
        </Text>
        <Text category={"h6"}>{score.score}</Text>
      </Row>

      <Text category={"s1"}>{score.description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
    padding: 12,
    width: 250,
    justifyContent: "space-between",
  },
  activeBackground: { backgroundColor: theme["color-gray"] },
  row: { justifyContent: "space-between", marginBottom: 30 },
  mainText: { width: "75%" },
});
