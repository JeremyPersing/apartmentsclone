import { View, ViewStyle } from "react-native";

import { Property } from "../types/property";
import { ImageCarousel } from "./ImageCarousel";
import { CardInformation } from "./CardInformation";

export const Card = ({
  property,
  style,
}: {
  property: Property;
  style?: ViewStyle;
}) => {
  return (
    <View style={style}>
      <ImageCarousel images={property.images} />
      <CardInformation property={property} />
    </View>
  );
};
