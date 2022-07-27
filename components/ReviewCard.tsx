import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import { Stars } from "./Stars";
import { Row } from "./Row";
import { Review } from "../types/review";
import { theme } from "../theme";
import { TextMoreOrLess } from "./TextMoreOrLess";

const getFormattedDate = (date: Date) => {
  const dateStr = date.toDateString(); // Thu Mar 31 2022
  const dateArr = dateStr.split(" "); // ['Thu', 'Mar', '31', '2022']
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
};

export const ReviewCard = ({
  review,
  style,
}: {
  review: Review;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={[styles.container, style]}>
      <Row style={styles.row}>
        <Stars score={review.stars} />
        <Text appearance={"hint"} category={"c1"}>
          {getFormattedDate(new Date(review.CreatedAt))}
        </Text>
      </Row>
      <Text category={"s1"} style={styles.reviewTitle}>
        {review.title}
      </Text>
      <TextMoreOrLess initialLines={10}>{review.body}</TextMoreOrLess>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    flexShrink: 1,
    textTransform: "capitalize",
  },
});
