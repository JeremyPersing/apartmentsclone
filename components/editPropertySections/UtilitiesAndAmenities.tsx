import { View, StyleSheet } from "react-native";
import { Text, Input, Divider } from "@ui-kitten/components";
import { PickerItem } from "react-native-woodpicker";

import { AmenitiesList } from "../AmenitiesList";
import { Select } from "../Select";
import { propertyUtilities } from "../../constants/propertyUtiliities";
import { propertyAmenities } from "../../constants/propertyAmenities";
import { petValues } from "../../constants/petValues";
import { laundryValues } from "../../constants/laundryValues";
import { theme } from "../../theme";

export const UtilitiesAndAmenities = ({
  includedUtilities,
  petsAllowed,
  laundryType,
  parkingFee,
  amenities,
  setFieldValue,
  handleChange,
}: {
  includedUtilities: string[];
  petsAllowed: PickerItem;
  laundryType: PickerItem;
  parkingFee: string;
  amenities: string[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}) => {
  return (
    <View>
      <Text category={"h6"} style={styles.defaultPaddingVertical}>
        Utilities Included
      </Text>
      <AmenitiesList
        amenitiesList={propertyUtilities}
        setAmenities={setFieldValue}
        field={"includedUtilities"}
        totalUnitAmenities={includedUtilities}
      />

      <Text category={"h6"} style={styles.defaultPaddingVertical}>
        Property Amenities
      </Text>

      <Select
        label="Pets Allowed"
        item={petsAllowed}
        items={petValues}
        onItemChange={(item) => setFieldValue("petsAllowed", item)}
        style={styles.input}
        isNullable={false}
      />
      <Select
        label="Laundry Type"
        item={laundryType}
        items={laundryValues}
        onItemChange={(item) => setFieldValue("laundryType", item)}
        style={styles.input}
        isNullable={false}
      />
      <Input
        value={parkingFee}
        onChangeText={handleChange("parkingFee")}
        label="Parking Fee"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <AmenitiesList
        style={styles.input}
        amenitiesList={propertyAmenities}
        setAmenities={setFieldValue}
        field={"amenities"}
        totalUnitAmenities={amenities}
      />
      <Divider style={[styles.divider, styles.input]} />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultPaddingVertical: { paddingVertical: 10 },
  input: {
    marginTop: 15,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginVertical: 10,
  },
});
