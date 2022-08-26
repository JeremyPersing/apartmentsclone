import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Input, Divider, Toggle, Button } from "@ui-kitten/components";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { PickerItem } from "react-native-woodpicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";

import { Loading } from "../components/Loading";
import { Screen } from "../components/Screen";
import { endpoints } from "../constants";
import { Property } from "../types/property";
import { bedValues } from "../constants/bedValues";
import { bathValues } from "../constants/bathValues";
import { Row } from "../components/Row";
import { Select } from "../components/Select";
import { PressableInput } from "../components/PressableInput";
import { theme } from "../theme";
import { UnitPhotosPicker } from "../components/UnitPhotosPicker";
import { UnitAmenities } from "../components/UnitAmenities";
import { UnitDescription } from "../components/UnitDescription";

const photosStr = "photos";
const amenitiesStr = "amenities";
const descriptionStr = "description";

export const EditPropertyScreen = ({
  route,
}: {
  route: { params: { propertyID: number } };
}) => {
  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
  const property: UseQueryResult<{ data: Property }, unknown> = useQuery(
    "property",
    () => axios.get(endpoints.getPropertyByID + route.params.propertyID)
  );

  const [showAlternateScreen, setShowAlternateScreen] = useState("");
  const [apartmentIndex, setApartmentIndex] = useState<number>(-1);

  const handleShowAlternateScreen = (index: number, name: string) => {
    // When there are multiple unit, we dont want to be
    // half way down the screen for amenities
    if (scrollViewRef.current) scrollViewRef.current.scrollToPosition(0, 0);
    setShowAlternateScreen(name);
    setApartmentIndex(index);
  };
  const handleHideAlternateScreen = () => {
    setShowAlternateScreen("");
    setApartmentIndex(-1);
  };

  if (property.isFetching || property.isLoading) return <Loading />;

  let initialApartments: TempApartment[] = [];
  if (property.data?.data) {
    for (let i of property.data.data.apartments) {
      initialApartments.push({
        unit: i.unit ? i.unit : "",
        bedrooms: bedValues.filter((item) => item.value === i.bedrooms)[0],
        bathrooms: bathValues.filter((item) => item.value === i.bathrooms)[0],
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
    }
  }

  return (
    <KeyboardAwareScrollView
      bounces={false}
      ref={(ref) => (scrollViewRef.current = ref)}
    >
      <Screen style={styles.container}>
        {!showAlternateScreen && (
          <Text category="h5" style={styles.header}>
            Basic Info
          </Text>
        )}
        <View>
          <Formik
            initialValues={{
              unitType: property.data?.data.unitType,
              apartments: initialApartments,
            }}
            onSubmit={(values) => console.log(values)}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              handleChange,
            }) => {
              const addUnit = () => {
                const apartments = [...values.apartments];
                apartments.push({
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

                setFieldValue("apartments", apartments);
              };

              const removeUnit = (index: number) => {
                const newApartments = values.apartments.filter(
                  (i, idx) => idx !== index
                );
                setFieldValue("apartments", newApartments);
              };

              if (showAlternateScreen === photosStr && apartmentIndex > -1)
                return (
                  <UnitPhotosPicker
                    setImages={setFieldValue}
                    images={values.apartments[apartmentIndex].images}
                    field={`apartments[${apartmentIndex}].images`}
                    cancel={handleHideAlternateScreen}
                  />
                );

              if (showAlternateScreen === amenitiesStr && apartmentIndex > -1)
                return (
                  <UnitAmenities
                    setAmenities={setFieldValue}
                    amenities={values.apartments[apartmentIndex].amenities}
                    field={`apartments[${apartmentIndex}].amenities`}
                    cancel={handleHideAlternateScreen}
                  />
                );

              if (showAlternateScreen === descriptionStr && apartmentIndex > -1)
                return (
                  <UnitDescription
                    setDescription={setFieldValue}
                    description={values.apartments[apartmentIndex].description}
                    field={`apartments[${apartmentIndex}].description`}
                    cancel={handleHideAlternateScreen}
                  />
                );

              return (
                <>
                  {values.apartments.map((i, index) => {
                    return (
                      <View key={i.unit + index}>
                        {values.apartments.length > 1 ? (
                          <>
                            {property.data?.data.apartments &&
                            index >= property.data?.data.apartments.length ? (
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
                              onChangeText={handleChange(
                                `apartments[${index}].unit`
                              )}
                              label="Unit"
                              placeholder="Unit No."
                              onBlur={() =>
                                setFieldTouched(`apartments[${index}].unit`)
                              }
                              caption={
                                touched.apartments &&
                                errors.apartments &&
                                (errors.apartments[index] as any)?.unit
                                  ? (errors.apartments[index] as any)?.unit
                                  : undefined
                              }
                              status={
                                touched.apartments &&
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
                            item={i.bedrooms}
                            items={bedValues}
                            onItemChange={(item) => {
                              setFieldValue(
                                `apartments[${index}].bedrooms`,
                                item
                              );
                            }}
                            isNullable={false}
                            style={styles.smallInput}
                          />
                          <Select
                            label="Baths"
                            item={i.bathrooms}
                            items={bathValues}
                            onItemChange={(item) => {
                              setFieldValue(
                                `apartments[${index}].bathrooms`,
                                item
                              );
                            }}
                            isNullable={false}
                            style={styles.smallInput}
                          />
                        </Row>
                        <Input
                          style={styles.input}
                          value={i.sqFt}
                          onChangeText={handleChange(
                            `apartments[${index}].sqFt`
                          )}
                          label="Sq Ft"
                          placeholder="SF"
                          keyboardType="number-pad"
                          onBlur={() =>
                            setFieldTouched(`apartments[${index}].sqFt`)
                          }
                          caption={
                            touched.apartments &&
                            errors.apartments &&
                            (errors.apartments[index] as any)?.sqFt
                              ? (errors.apartments[index] as any)?.sqFt
                              : undefined
                          }
                          status={
                            touched.apartments &&
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
                            value={i.rent}
                            onChangeText={handleChange(
                              `apartments[${index}].rent`
                            )}
                            onBlur={() =>
                              setFieldTouched(`apartments[${index}].rent`)
                            }
                            caption={
                              touched.apartments &&
                              errors.apartments &&
                              (errors.apartments[index] as any)?.rent
                                ? (errors.apartments[index] as any)?.rent
                                : undefined
                            }
                            status={
                              touched.apartments &&
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
                            value={i.deposit}
                            onChangeText={handleChange(
                              `apartments[${index}].deposit`
                            )}
                            onBlur={() =>
                              setFieldTouched(`apartments[${index}].deposit`)
                            }
                            caption={
                              touched.apartments &&
                              errors.apartments &&
                              (errors.apartments[index] as any)?.deposit
                                ? (errors.apartments[index] as any)?.deposit
                                : undefined
                            }
                            status={
                              touched.apartments &&
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
                            onChangeText={handleChange(
                              `apartments[${index}].leaseLength`
                            )}
                            onBlur={() =>
                              setFieldTouched(
                                `apartments[${index}].leaseLength`
                              )
                            }
                            caption={
                              touched.apartments &&
                              errors.apartments &&
                              (errors.apartments[index] as any)?.leaseLength
                                ? (errors.apartments[index] as any)?.leaseLength
                                : undefined
                            }
                            status={
                              touched.apartments &&
                              errors.apartments &&
                              (errors.apartments[index] as any)?.leaseLength
                                ? "danger"
                                : "basic"
                            }
                          />
                          <PressableInput
                            style={styles.smallInput}
                            onPress={() =>
                              setFieldValue(
                                `apartments[${index}].showCalendar`,
                                true
                              )
                            }
                            value={i.availableOn.toDateString()}
                            label={"Available On"}
                          />
                          {i.showCalendar && (
                            <DateTimePicker
                              value={i.availableOn}
                              mode="date"
                              onChange={(event: any, selectedDate?: Date) => {
                                if (selectedDate) {
                                  setFieldValue(
                                    `apartments[${index}].showCalendar`,
                                    false
                                  );
                                  setFieldValue(
                                    `apartments[${index}].availableOn`,
                                    selectedDate
                                  );
                                }
                              }}
                            />
                          )}
                        </Row>
                        <Divider style={styles.divider} />
                        <TouchableOpacity
                          onPress={() =>
                            handleShowAlternateScreen(index, photosStr)
                          }
                        >
                          <Text status={"info"}>Unit Photos</Text>
                        </TouchableOpacity>
                        <Divider style={styles.divider} />
                        <TouchableOpacity
                          onPress={() =>
                            handleShowAlternateScreen(index, amenitiesStr)
                          }
                        >
                          <Text status={"info"}>Unit Amenities</Text>
                        </TouchableOpacity>
                        <Divider style={styles.divider} />
                        <TouchableOpacity
                          onPress={() =>
                            handleShowAlternateScreen(index, descriptionStr)
                          }
                        >
                          <Text status={"info"}>Unit Description</Text>
                        </TouchableOpacity>
                        <Divider style={styles.divider} />

                        <Row style={styles.toggleRow}>
                          <Text>Active</Text>
                          <Toggle
                            checked={values.apartments[index].active}
                            onChange={(isChecked) =>
                              setFieldValue(
                                `apartments[${index}].active`,
                                isChecked
                              )
                            }
                          />
                        </Row>
                        <Divider style={styles.divider} />
                        {index + 1 === values.apartments?.length ? (
                          <>
                            <TouchableOpacity
                              style={styles.addUnit}
                              onPress={addUnit}
                            >
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
                  <Button onPress={() => handleSubmit()}>Submit</Button>
                </>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

type TempApartment = {
  unit: string;
  bedrooms: PickerItem;
  bathrooms: PickerItem;
  sqFt: string;
  rent: string;
  deposit: string;
  leaseLength: string;
  availableOn: Date;
  active: boolean;
  showCalendar: boolean;
  images: string[];
  amenities: string[];
  description: string;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    textAlign: "center",
    paddingVertical: 10,
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
