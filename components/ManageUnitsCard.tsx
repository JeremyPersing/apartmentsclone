import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { FormikErrors, FormikTouched } from "formik/dist/types";
import { PickerItem } from "react-native-woodpicker";

import { theme } from "../theme";
import { EditApartment } from "../types/apartment";
import { Row } from "./Row";
import { Select } from "./Select";
import { bedValues } from "../constants/bedValues";
import { bathValues } from "../constants/bathValues";

export const ManageUnitsCard = ({
  apartment,
  index,
  removable,
  errors,
  touched,
  removeUnit,
  setFieldValue,
  setFieldTouched,
  handleChange,
}: {
  apartment: EditApartment;
  index: number;
  removable: boolean;
  errors: FormikErrors<{
    apartments: EditApartment[];
  }>;
  touched: FormikTouched<{
    apartments: EditApartment[];
  }>;
  removeUnit: (idx: number) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
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
  const changeApartmentArchive = () => {
    setFieldValue(`apartments[${index}].active`, !apartment.active);
  };

  const showEditName = () =>
    setFieldValue(`apartments[${index}].editName`, true);

  const hideEditName = () =>
    setFieldValue(`apartments[${index}].editName`, false);

  return (
    <View style={styles.container}>
      <View style={styles.unitNameContainer}>
        <Row style={styles.unitNameRow}>
          {apartment.unit && !apartment.editName ? (
            <>
              <Text>{apartment.unit}</Text>
              <TouchableOpacity
                onPress={showEditName}
                style={styles.editNameButton}
              >
                <MaterialIcons
                  name="info-outline"
                  size={18}
                  color={theme["color-info-500"]}
                />
                <Text style={styles.editNameText} status="info">
                  Edit
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Input
                style={styles.editNameInput}
                value={apartment.unit}
                onChangeText={handleChange(`apartments[${index}].unit`)}
                placeholder="Unit Name"
                autoCorrect={false}
                onBlur={() => setFieldTouched(`apartments[${index}].unit`)}
                caption={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.unit &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.unit
                    ? (errors.apartments[index] as any)?.unit
                    : undefined
                }
                status={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.unit &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.unit
                    ? "danger"
                    : "basic"
                }
              />
              <TouchableOpacity
                onPress={hideEditName}
                style={styles.doneButton}
              >
                <Text status="info">Done</Text>
              </TouchableOpacity>
            </>
          )}
        </Row>
      </View>
      <View style={styles.inputContainer}>
        <Select
          label="Beds"
          item={apartment.bedrooms as PickerItem}
          items={bedValues}
          onItemChange={(item) => {
            setFieldValue(`apartments[${index}].bedrooms`, item);
          }}
          isNullable={false}
        />
        <Select
          label="Baths"
          style={styles.defaultMarginTop}
          item={apartment.bathrooms as PickerItem}
          items={bathValues}
          onItemChange={(item) => {
            setFieldValue(`apartments[${index}].bathrooms`, item);
          }}
          isNullable={false}
        />

        <Input
          style={styles.defaultMarginTop}
          value={apartment.sqFt as string}
          onChangeText={handleChange(`apartments[${index}].sqFt`)}
          placeholder="Unit Sq Ft"
          label="Sq Ft"
          autoCorrect={false}
          onBlur={() => setFieldTouched(`apartments[${index}].sqFt`)}
          caption={
            touched.apartments &&
            (touched.apartments[index] as any)?.sqFt &&
            errors.apartments &&
            (errors.apartments[index] as any)?.sqFt
              ? (errors.apartments[index] as any)?.sqFt
              : undefined
          }
          status={
            touched.apartments &&
            (touched.apartments[index] as any)?.sqFt &&
            errors.apartments &&
            (errors.apartments[index] as any)?.sqFt
              ? "danger"
              : "basic"
          }
        />

        <Button
          onPress={removable ? () => removeUnit(index) : changeApartmentArchive}
          appearance="ghost"
          status="info"
          style={[
            styles.defaultMarginTop,
            {
              alignSelf: "flex-end",
            },
          ]}
        >
          {removable ? "Remove" : apartment.active ? "Archive" : "Unarchive"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: theme["color-gray"],
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  unitNameContainer: { backgroundColor: theme["color-gray"] },
  unitNameRow: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  editNameButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  editNameText: { marginLeft: 5 },
  editNameInput: {
    width: "80%",
  },
  doneButton: { marginLeft: 20, marginTop: 10 },
  inputContainer: { paddingHorizontal: 10, paddingVertical: 15 },
  defaultMarginTop: { marginTop: 10 },
});
