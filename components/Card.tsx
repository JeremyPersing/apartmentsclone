import { Pressable, ViewStyle, StyleSheet } from "react-native";

import { Property } from "../types/property";
import { ImageCarousel } from "./ImageCarousel";
import { CardInformation } from "./CardInformation";
import { LISTMARGIN } from "../constants";

export const Card = ({
  property,
  onPress,
  style,
}: {
  property: Property;
  onPress?: () => void;
  style?: ViewStyle;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <ImageCarousel
        onImagePress={onPress}
        images={property.images}
        chevronsShown
      />
      <CardInformation property={property} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
