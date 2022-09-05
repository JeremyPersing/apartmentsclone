import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Toggle, Text, Divider } from "@ui-kitten/components";
import { FormikErrors, FormikTouched } from "formik";
import DateTimePicker from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";

import { Row } from "../Row";
import { Select } from "../Select";
import { PressableInput } from "../PressableInput";
import { TempApartment } from "../../types/tempApartment";
import { Property } from "../../types/property";
import { bedValues } from "../../constants/bedValues";
import { bathValues } from "../../constants/bathValues";
import { AMENITIES_STR, DESCRIPTION_STR, PHOTOS_STR } from "../../constants";
import { theme } from "../../theme";
import { EditPropertyInitialValues } from "../../types/editPropertyInitialValues";
import { PickerItem } from "react-native-woodpicker/dist/types";

export const UnitsInput = ({
  unitType,
  apartments,
  property,
  touched,
  errors,
  setFieldTouched,
  setFieldValue,
  handleChange,
  handleShowAlternateScreen,
}: {
  unitType: string | undefined;
  apartments: TempApartment[];
  property: Property | undefined;
  touched: FormikTouched<EditPropertyInitialValues>;
  errors: FormikErrors<EditPropertyInitialValues>;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
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
  handleShowAlternateScreen: (index: number, name: string) => void;
}) => {
  const addUnit = () => {
    const newApartments = [...apartments];
    newApartments.push({
      unit: "",
      bedrooms: bedValues[0],
      bathrooms: bathValues[0],
      sqFt: "",
      rent: "",
      deposit: "0",
      leaseLength: "12 Months",
      availableOn: new Date(),
      active: true,
      showCalendar: false,
      images: [],
      amenities: [],
      description: "",
    });

    setFieldValue("apartments", newApartments);
    if (newApartments.length > 1 && unitType !== "mutliple") {
      setFieldValue("unitType", "multiple");
    }
  };

  const removeUnit = (index: number) => {
    const newApartments = apartments.filter((i, idx) => idx !== index);
    setFieldValue("apartments", newApartments);
    if (newApartments.length === 1 && unitType !== "single") {
      setFieldValue("unitType", "single");
    }
  };

  return (
    <View style={styles.unitInputs}>
      {apartments.map((i, index) => {
        return (
          <View key={index}>
            {apartments.length > 1 ? (
              <>
                {property &&
                property.apartments &&
                index >= property.apartments.length ? (
                  <TouchableOpacity
                    style={styles.removeUnit}
                    onPress={() => removeUnit(index)}
                  >
                    <Text
                      style={styles.removeUnitText}
                      appearance={"hint"}
                      category={"c1"}
                      status="info"
                    >
                      Remove Unit
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <Input
                  style={styles.input}
                  value={i.unit}
                  onChangeText={handleChange(`apartments[${index}].unit`)}
                  label="Unit"
                  placeholder="Unit No."
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
              </>
            ) : null}
            <Row style={[styles.input, styles.unitRow]}>
              <Select
                label="Beds"
                item={i.bedrooms as PickerItem}
                items={bedValues}
                onItemChange={(item) => {
                  setFieldValue(`apartments[${index}].bedrooms`, item);
                }}
                isNullable={false}
                style={styles.smallInput}
              />
              <Select
                label="Baths"
                item={i.bathrooms as PickerItem}
                items={bathValues}
                onItemChange={(item) => {
                  setFieldValue(`apartments[${index}].bathrooms`, item);
                }}
                isNullable={false}
                style={styles.smallInput}
              />
            </Row>
            <Input
              style={styles.input}
              value={i.sqFt as string}
              onChangeText={handleChange(`apartments[${index}].sqFt`)}
              label="Sq Ft"
              placeholder="SF"
              keyboardType="number-pad"
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
            <Row style={[styles.input, styles.unitRow]}>
              <Input
                style={styles.smallInput}
                label={"Rent"}
                placeholder="$/mo"
                keyboardType="number-pad"
                value={i.rent as string}
                onChangeText={handleChange(`apartments[${index}].rent`)}
                onBlur={() => setFieldTouched(`apartments[${index}].rent`)}
                caption={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.rent &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.rent
                    ? (errors.apartments[index] as any)?.rent
                    : undefined
                }
                status={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.rent &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.rent
                    ? "danger"
                    : "basic"
                }
              />
              <Input
                style={styles.smallInput}
                label={"Deposit"}
                keyboardType="number-pad"
                value={i.deposit as string}
                onChangeText={handleChange(`apartments[${index}].deposit`)}
                onBlur={() => setFieldTouched(`apartments[${index}].deposit`)}
                caption={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.deposit &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.deposit
                    ? (errors.apartments[index] as any)?.deposit
                    : undefined
                }
                status={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.deposit &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.deposit
                    ? "danger"
                    : "basic"
                }
              />
            </Row>
            <Row style={[styles.input, styles.unitRow]}>
              <Input
                style={styles.smallInput}
                label={"Lease Length"}
                value={i.leaseLength}
                placeholder="12 Months"
                onChangeText={handleChange(`apartments[${index}].leaseLength`)}
                onBlur={() =>
                  setFieldTouched(`apartments[${index}].leaseLength`)
                }
                caption={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.leaseLength &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.leaseLength
                    ? (errors.apartments[index] as any)?.leaseLength
                    : undefined
                }
                status={
                  touched.apartments &&
                  (touched.apartments[index] as any)?.leaseLength &&
                  errors.apartments &&
                  (errors.apartments[index] as any)?.leaseLength
                    ? "danger"
                    : "basic"
                }
              />
              <PressableInput
                style={styles.smallInput}
                onPress={() =>
                  setFieldValue(`apartments[${index}].showCalendar`, true)
                }
                value={i.availableOn.toDateString()}
                label={"Available On"}
              />
              <DateTimePicker
                isVisible={i.showCalendar}
                mode="date"
                onConfirm={(selectedDate: Date) => {
                  if (selectedDate) {
                    setFieldValue(
                      `apartments[${index}].availableOn`,
                      selectedDate
                    );
                    setFieldValue(`apartments[${index}].showCalendar`, false);
                  }
                }}
                onCancel={() =>
                  setFieldValue(`apartments[${index}].showCalendar`, false)
                }
              />
            </Row>
            <Divider style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleShowAlternateScreen(index, PHOTOS_STR)}
            >
              <Text status={"info"}>Unit Photos</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleShowAlternateScreen(index, AMENITIES_STR)}
            >
              <Text status={"info"}>Unit Amenities</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity
              onPress={() => handleShowAlternateScreen(index, DESCRIPTION_STR)}
            >
              <Text status={"info"}>Unit Description</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />

            <Row style={styles.toggleRow}>
              <Text>Active</Text>
              <Toggle
                checked={apartments[index].active}
                onChange={(isChecked) =>
                  setFieldValue(`apartments[${index}].active`, isChecked)
                }
              />
            </Row>
            <Divider style={styles.divider} />
            {index + 1 === apartments?.length ? (
              <>
                <TouchableOpacity style={styles.addUnit} onPress={addUnit}>
                  <MaterialIcons
                    name="add-circle-outline"
                    size={20}
                    color={theme["color-info-500"]}
                  />
                  <Text status="info" style={styles.addUnitText}>
                    Add Another Unit
                  </Text>
                </TouchableOpacity>
                <Divider
                  style={{
                    backgroundColor: theme["color-gray"],
                  }}
                />
              </>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  unitInputs: {
    borderColor: theme["color-gray"],
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
  },
  input: {
    marginTop: 15,
  },
  unitRow: { justifyContent: "space-between" },
  smallInput: { width: "45%" },
  divider: {
    backgroundColor: theme["color-gray"],
    marginVertical: 10,
  },
  toggleRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  addUnit: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  addUnitText: { marginLeft: 10 },
  removeUnit: {
    position: "absolute",
    right: 5,
    zIndex: 10,
    top: 15,
  },
  removeUnitText: {
    fontWeight: "bold",
  },
});
