import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import { Row } from "./Row";
import { theme } from "../theme";
import { Stars } from "./Stars";

const getScoreText = (score: number) => {
  if (score >= 4) return "Great";
  if (score < 4 && score >= 3) return "Good";
  if (score < 3 && score >= 2) return "Average";
  if (score < 2 && score >= 1) return "Below Average";
  if (score === 0) return "No Reviews Yet";
  return "Bad";
};

const getRenterReviewText = (num: number) => {
  if (num === 0) return "";
  if (num === 1) return `${num} Renter Review`;
  return `${num} Renters Review`;
};

export const OverallReviewScoreCard = ({
  score,
  numberOfReviews,
  style,
}: {
  score: number;
  numberOfReviews: number;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={[styles.container, style]}>
      <Row style={[styles.row, styles.smallMarginVertical]}>
        <Text category={"s1"} style={styles.scoreText}>
          {getScoreText(score)}
        </Text>
        <Stars score={score} />
      </Row>
      <Row style={styles.row}>
        <Text category={"s1"}>{`${score} Blended Score`}</Text>
        <Text category={"h4"}>{score}</Text>
      </Row>
      <Row style={[styles.row, styles.smallMarginVertical]}>
        <Text category={"c1"}>{getRenterReviewText(numberOfReviews)}</Text>
        {numberOfReviews === 0 ? null : <Text category={"c1"}>Out of 5</Text>}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    width: "100%",
  },
  row: { justifyContent: "space-between", alignItems: "center" },
  scoreText: { color: theme["color-primary-500"] },
  smallMarginVertical: { marginVertical: 5 },
});
