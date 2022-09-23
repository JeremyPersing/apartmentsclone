import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Divider, Button } from "@ui-kitten/components";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import { PickerItem } from "react-native-woodpicker";
import { MaterialIcons } from "@expo/vector-icons";
import * as yup from "yup";

import { Screen } from "./Screen";
import { ModalHeader } from "./ModalHeader";
import { Row } from "./Row";
import { UnitButton } from "./UnitButton";
import { SearchLocation } from "../types/locationIQ";
import { SearchAddress } from "./SearchAddress";
import { getStateAbbreviation } from "../utils/getStateAbbreviation";
import { Select } from "./Select";
import { theme } from "../theme";
import { CreateProperty } from "../types/property";
import { useUser } from "../hooks/useUser";
import { bedValues } from "../constants/bedValues";
import { bathValues } from "../constants/bathValues";
import { useCreatePropertyMutation } from "../hooks/mutations/useCreatePropertyMutation";

export const AddPropertySection = () => {
  const { user } = useUser();
  const [searchingLocation, setSearchingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);

  const createProperty = useCreatePropertyMutation();

  const onSubmit = (values: {
    unitType: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    lat: string;
    lng: string;
    propertyType: PickerItem;
    unit: {
      bedrooms: PickerItem;
      bathrooms: PickerItem;
    };
    units: {
      unit: string;
      bedrooms: PickerItem;
      bathrooms: PickerItem;
    }[];
  }) => {
    if (user) {
      const obj: CreateProperty = {
        unitType: values.unitType,
        propertyType: values.propertyType.value,
        street: values.street,
        city: values.city,
        state: values.state,
        zip: Number(values.zip),
        lat: Number(values.lat),
        lng: Number(values.lng),
        userID: user.ID,
        apartments: [],
      };

      const availableOn = new Date();
      if (values.unitType === "multiple") {
        for (let i of values.units) {
          obj.apartments.push({
            unit: i.unit,
            bathrooms: i.bathrooms.value,
            bedrooms: i.bedrooms.value,
            active: true,
            availableOn,
          });
        }
      } else {
        obj.apartments.push({
          bathrooms: values.unit.bathrooms.value,
          bedrooms: values.unit.bedrooms.value,
          active: true,
          availableOn,
        });
      }

      createProperty.mutate(obj);
    }
  };

  const handleGoBack = () => {
    setSearchingLocation(false);
  };

  return (
    <KeyboardAwareFlatList
      data={[1]}
      renderItem={() => {
        return (
          <Screen>
            {!searchingLocation && <ModalHeader text="JPApartments" xShown />}
            <View style={styles.container}>
              {!searchingLocation && (
                <Text category={"h5"} style={styles.header}>
                  Add a Property
                </Text>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => onSubmit(values)}
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
                  const onLocationFocus = () => {
                    setSearchingLocation(true);
                    setFieldTouched("street");
                  };

                  const handleSuggestionPress = (item: any) => {
                    const location = item as SearchLocation;

                    let street = location.address?.road;
                    if (location.address?.house_number)
                      street = `${location.address.house_number} ${street}`;

                    // International use case (current Property Data Struct only really applies to USA)
                    let state = location.address.state;
                    if (!state) state = location.address.country;

                    setFieldValue("street", street);
                    setFieldValue("city", location.address.city);
                    setFieldValue("state", state);
                    setFieldValue("zip", location.address.postcode);
                    setFieldValue("lat", location.lat);
                    setFieldValue("lng", location.lon);

                    handleGoBack();
                  };

                  const currentLocation = values.street
                    ? values.state
                      ? `${values.street}, ${
                          values.city
                        }, ${getStateAbbreviation(values.state)}`
                      : `${values.street}, ${values.city}`
                    : "";

                  if (searchingLocation)
                    return (
                      <SearchAddress
                        type="search"
                        suggestions={suggestions}
                        setSuggestions={(item) =>
                          setSuggestions(item as SearchLocation[])
                        }
                        handleGoBack={handleGoBack}
                        handleSuggestionPress={handleSuggestionPress}
                        defaultLocation={currentLocation}
                      />
                    );

                  const addUnit = () => {
                    const currUnits = [...values.units];
                    currUnits.push({
                      unit: "",
                      bedrooms: bedValues[0],
                      bathrooms: bathValues[0],
                    });

                    setFieldValue("units", currUnits);
                  };

                  const removeUnit = (index: number) => {
                    const currUnits = [...values.units];
                    const newUnits = currUnits.filter(
                      (i, idx) => index !== idx
                    );
                    setFieldValue("units", newUnits);
                  };

                  return (
                    <View>
                      <Row style={styles.row}>
                        <UnitButton
                          text="Single Unit"
                          iconName="home"
                          active={values.unitType === "single" ? true : false}
                          onPress={() => setFieldValue("unitType", "single")}
                        />
                        <UnitButton
                          text="Multiple Units"
                          iconName="apartment"
                          active={values.unitType === "multiple" ? true : false}
                          onPress={() => setFieldValue("unitType", "multiple")}
                        />
                      </Row>

                      <Input
                        placeholder="Property Address"
                        label="Address"
                        value={currentLocation}
                        onFocus={onLocationFocus}
                        style={styles.input}
                        caption={
                          !values.street && touched.street && errors.street
                            ? errors.street
                            : undefined
                        }
                        status={
                          !values.street && touched.street && errors.street
                            ? "danger"
                            : "basic"
                        }
                      />

                      <Select
                        label="Property Type"
                        item={values.propertyType}
                        items={propertyTypes}
                        onItemChange={(item) =>
                          setFieldValue("propertyType", item)
                        }
                        isNullable={false}
                        style={styles.input}
                      />

                      {values.unitType === "single" ? (
                        <Row style={[styles.input, styles.unitRow]}>
                          <Select
                            label="Beds"
                            item={values.unit.bedrooms}
                            items={bedValues}
                            onItemChange={(item) => {
                              setFieldValue("unit.bedrooms", item);
                            }}
                            isNullable={false}
                            style={styles.smallSelect}
                          />
                          <Select
                            label="Baths"
                            item={values.unit.bathrooms}
                            items={bathValues}
                            onItemChange={(item) => {
                              setFieldValue("unit.bathrooms", item);
                            }}
                            isNullable={false}
                            style={styles.smallSelect}
                          />
                        </Row>
                      ) : (
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
                            <Text
                              category={"s2"}
                              status="info"
                              style={styles.addUnitText}
                            >
                              Add Another Unit
                            </Text>
                          </TouchableOpacity>

                          {values.units.map((item, index) => (
                            <View key={index} style={styles.unitSection}>
                              {index > 0 ? (
                                <Divider style={styles.divider} />
                              ) : null}

                              {/* Unit Input */}
                              <View>
                                {values.units.length > 1 ? (
                                  <TouchableOpacity
                                    style={styles.removeUnit}
                                    onPress={() => removeUnit(index)}
                                  >
                                    <Text
                                      appearance={"hint"}
                                      category={"c1"}
                                      style={styles.removeUnitText}
                                      status="info"
                                    >
                                      Remove Unit
                                    </Text>
                                  </TouchableOpacity>
                                ) : null}
                                <Input
                                  label="Unit"
                                  placeholder="# / Name"
                                  value={item.unit}
                                  onChangeText={handleChange(
                                    `units[${index}].unit`
                                  )}
                                  autoCorrect={false}
                                  caption={
                                    errors.units &&
                                    touched.units &&
                                    (errors.units[index] as any)?.unit
                                      ? (errors.units[index] as any).unit
                                      : undefined
                                  }
                                  status={
                                    errors.units &&
                                    touched.units &&
                                    (errors.units[index] as any)?.unit
                                      ? "danger"
                                      : "basic"
                                  }
                                />
                              </View>

                              <Row style={[styles.input, styles.unitRow]}>
                                <Select
                                  label="Beds"
                                  item={item.bedrooms}
                                  items={bedValues}
                                  onItemChange={(item) => {
                                    setFieldValue(
                                      `units[${index}].bedrooms`,
                                      item
                                    );
                                  }}
                                  isNullable={false}
                                  style={styles.smallSelect}
                                />
                                <Select
                                  label="Baths"
                                  item={item.bathrooms}
                                  items={bathValues}
                                  onItemChange={(item) => {
                                    setFieldValue(
                                      `units[${index}].bathrooms`,
                                      item
                                    );
                                  }}
                                  isNullable={false}
                                  style={styles.smallSelect}
                                />
                              </Row>
                            </View>
                          ))}
                        </>
                      )}

                      <Button
                        onPress={() => handleSubmit()}
                        style={styles.button}
                      >
                        Add My Property
                      </Button>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </Screen>
        );
      }}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { marginVertical: 20, textAlign: "center" },
  row: {
    justifyContent: "space-evenly",
  },
  input: {
    marginTop: 15,
  },
  unitRow: { justifyContent: "space-between" },
  smallSelect: { width: "45%" },
  unitSection: {
    marginVertical: 20,
  },
  addUnit: {
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    paddingRight: 10,
  },
  addUnitText: { fontWeight: "bold", marginLeft: 5 },
  removeUnit: {
    position: "absolute",
    right: 5,
    zIndex: 10,
    paddingBottom: 5,
  },
  removeUnitText: {
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginBottom: 30,
    width: "95%",
    alignSelf: "center",
  },
  button: {
    marginTop: 20,
  },
});

const propertyTypes: PickerItem[] = [
  { label: "Apartment", value: "Apartment" },
  { label: "Single Family House", value: "Single Family House" },
  { label: "Condominium", value: "Condominium" },
  { label: "Townhouse", value: "Townhouse" },
  {
    label: "Mobile Home / Manufactured Home",
    value: "Mobile Home / Manufactured Home",
  },
];

const initialValues = {
  unitType: "single",
  street: "",
  city: "",
  state: "",
  zip: "",
  lat: "",
  lng: "",
  propertyType: propertyTypes[0],
  unit: {
    bedrooms: bedValues[0],
    bathrooms: bathValues[0],
  },
  units: [
    {
      unit: "",
      bedrooms: bedValues[0],
      bathrooms: bathValues[0],
    },
  ],
};

const validationSchema = yup.object().shape({
  unitType: yup.string().required("Required"),
  street: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  zip: yup.string().required("Required"),
  lat: yup.string().required("Required"),
  lng: yup.string().required("Required"),
  propertyType: yup.object().shape({
    label: yup.string().required("Required"),
    value: yup.string().required("Required"),
  }),
  unit: yup.object().when("unitType", {
    is: "single",
    then: yup.object().shape({
      bedrooms: yup.object().shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required"),
      }),
      bathrooms: yup.object().shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required"),
      }),
    }),
  }),
  units: yup.array().when("unitType", {
    is: "multiple",
    then: yup.array(
      yup.object().shape({
        unit: yup.string().required("Required"),
        bedrooms: yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        }),
        bathrooms: yup.object().shape({
          label: yup.string().required("Required"),
          value: yup.string().required("Required"),
        }),
      })
    ),
  }),
});
