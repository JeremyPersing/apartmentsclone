import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Row } from "../Row";
import { BulletedList } from "../BulletedList";
import { Property } from "../../types/property";

export const AmentitiesSection = ({ property }: { property: Property }) => {
  const apartmentsAmenities = [];
  const amenityExists = new Map<string, boolean>();
  for (let apartment of property.apartments) {
    if (apartment?.amenities) {
      for (let amenity of apartment.amenities) {
        if (!amenityExists.get(amenity)) {
          apartmentsAmenities.push(amenity);
          amenityExists.set(amenity, true);
        }
      }
    }
  }

  return (
    <>
      {property.amenities && property.amenities.length > 0 ? (
        <>
          <Text category={"h5"} style={styles.defaultMarginVertical}>
            Amenities
          </Text>
          <Row style={styles.row}>
            <MaterialCommunityIcons
              name="google-circles-communities"
              color={"black"}
              size={24}
            />
            <Text style={styles.text} category={"h6"}>
              Community Amenities
            </Text>
          </Row>
          <BulletedList data={property.amenities} />
        </>
      ) : null}

      {apartmentsAmenities.length > 0 ? (
        <>
          <Row style={styles.row}>
            <MaterialCommunityIcons
              name="toy-brick-outline"
              color={"black"}
              size={24}
            />
            <Text style={styles.text} category={"h6"}>
              Apartment Features
            </Text>
          </Row>
          <BulletedList data={apartmentsAmenities} />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  row: { alignItems: "center", paddingVertical: 10 },
  text: { marginLeft: 10 },
  defaultMarginVertical: { marginVertical: 10 },
});
