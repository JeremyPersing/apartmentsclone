import { CheckBox } from "@ui-kitten/components";
import { StyleSheet, View, ViewStyle } from "react-native";
import { memo } from "react";

export const AmenitiesList = memo(
  ({
    amenitiesList,
    totalUnitAmenities,
    field,
    setAmenities,
    style,
  }: {
    amenitiesList: string[];
    totalUnitAmenities: string[];
    field: string;
    setAmenities: (field: string, values: any) => void;
    style?: ViewStyle;
  }) => {
    const amenitiesMap = new Map<string, boolean>();
    amenitiesList.forEach((i) => amenitiesMap.set(i, false));
    totalUnitAmenities.forEach((i) => amenitiesMap.set(i, true));

    const handleAddAmenity = (name: string) => {
      amenitiesMap.set(name, true);
      const newAmenities = [...totalUnitAmenities];
      newAmenities.push(name);
      setAmenities(field, newAmenities);
    };

    const handleDeleteAmenity = (name: string) => {
      amenitiesMap.set(name, false);
      const newAmenities = totalUnitAmenities.filter((i) => i !== name);
      setAmenities(field, newAmenities);
    };
    return (
      <View style={style}>
        {amenitiesList.map((i) => (
          <CheckBox
            key={i}
            style={styles.defaultMarginVertical}
            onChange={
              amenitiesMap.get(i)
                ? () => handleDeleteAmenity(i)
                : () => handleAddAmenity(i)
            }
            checked={amenitiesMap.get(i) ? true : false}
          >
            {i}
          </CheckBox>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
});
