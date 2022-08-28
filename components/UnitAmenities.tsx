import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

import { ModalHeader } from "./ModalHeader";
import {
  unitAmenities,
  kitchenAmenities,
  livingSpaceAmenities,
  outdoorAmenities,
} from "../constants/unitAmenities";
import { AmenitiesList } from "./AmenitiesList";

export const UnitAmenities = ({
  amenities,
  field,
  setAmenities,
  cancel,
}: {
  amenities: string[];
  field: string;
  setAmenities: (field: string, values: any) => void;
  cancel?: () => void;
}) => {
  return (
    <View>
      <ModalHeader
        xShown
        text="Unit Amenities"
        onPress={cancel ? cancel : undefined}
      />
      <Text category="h6" style={styles.header}>
        Features
      </Text>
      <AmenitiesList
        totalUnitAmenities={amenities}
        amenitiesList={unitAmenities}
        field={field}
        setAmenities={setAmenities}
      />

      <Text category="h6" style={styles.header}>
        Kitchen
      </Text>
      <AmenitiesList
        totalUnitAmenities={amenities}
        amenitiesList={kitchenAmenities}
        field={field}
        setAmenities={setAmenities}
      />

      <Text category="h6" style={styles.header}>
        Living Space
      </Text>
      <AmenitiesList
        totalUnitAmenities={amenities}
        amenitiesList={livingSpaceAmenities}
        field={field}
        setAmenities={setAmenities}
      />

      <Text category="h6" style={styles.header}>
        Outdoors
      </Text>
      <AmenitiesList
        totalUnitAmenities={amenities}
        amenitiesList={outdoorAmenities}
        field={field}
        setAmenities={setAmenities}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
});
