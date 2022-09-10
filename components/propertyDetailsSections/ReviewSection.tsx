import { FlatList, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";

import { Property } from "../../types/property";
import { OverallReviewScoreCard } from "../OverallReviewScoreCard";
import { ReviewCard } from "../ReviewCard";

export const ReviewSection = ({ property }: { property: Property }) => {
  return (
    <>
      <Text category={"h5"} style={styles.defaultMarginVertical}>
        Reviews
      </Text>
      {property.reviews ? (
        <>
          <OverallReviewScoreCard
            numberOfReviews={property.reviews ? property.reviews.length : 0}
            score={property.stars}
            style={styles.defaultMarginVertical}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatListMargin}
            data={property.reviews}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({ item }) => <ReviewCard review={item} />}
          />
        </>
      ) : (
        <Text>No reviews yet. Be the first one to review this property.</Text>
      )}

      <Button
        onPress={() => console.log("navigate to the review screen")}
        style={styles.defaultMarginVertical}
      >
        Write a Review
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
  flatListMargin: { marginBottom: 50 },
});
