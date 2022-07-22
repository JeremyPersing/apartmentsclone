import { useState } from "react";
import { Platform, StyleSheet, View, Image, Pressable } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { Row } from "../components/Row";
import { getStateAbbreviation } from "../utils/getStateAbbreviation";
import { useAuth } from "../hooks/useAuth";
import { properties } from "../data/properties";

export const MessageScreen = ({
  route,
}: {
  route: { params: { propertyID: number; tour?: boolean } };
}) => {
  const navigation = useNavigation();
  const { tour, propertyID } = route.params;
  const index = properties.findIndex((i) => i.id === propertyID);
  const property = properties[index];
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const { user } = useAuth();

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        {Platform.OS === "ios" ? <ModalHeader /> : null}
        <Row style={styles.row}>
          <Image style={styles.image} source={{ uri: property.images[0] }} />
          <View style={styles.address}>
            <Text category={"s1"}>{property.name}</Text>
            <Text category={"c1"}>
              {property.street}, {property.city},{" "}
              {getStateAbbreviation(property.state)} {property.zip}
            </Text>
            <Text category={"c1"}>
              ${property.rentLow.toLocaleString()} -{" "}
              {property.rentHigh.toLocaleString()} | {property.bedroomLow} -{" "}
              {property.bedroomHigh} Beds
            </Text>
          </View>
        </Row>

        <Formik
          initialValues={{
            firstName: user ? user.firstName : "",
            lastName: user ? user.lastName : "",
            phoneNumber: "",
            email: user ? user.email : "",
            message: tour ? "I would like to schedule a tour." : "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required("Required"),
            lastName: yup.string().required("Required"),
            phoneNumber: yup.string(),
            email: yup.string().email().required("Required"),
            message: yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            console.log("send values", values);
            navigation.goBack();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <>
                <Input
                  style={styles.input}
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  placeholder="Your first name"
                  keyboardType="default"
                  label="First Name*"
                  onBlur={() => setFieldTouched("firstName")}
                  caption={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : undefined
                  }
                  status={
                    touched.firstName && errors.firstName ? "danger" : "basic"
                  }
                />
                <Input
                  style={styles.input}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  placeholder="Your last name"
                  keyboardType="default"
                  label="Last Name*"
                  onBlur={() => setFieldTouched("lastName")}
                  caption={
                    touched.lastName && errors.lastName
                      ? errors.lastName
                      : undefined
                  }
                  status={
                    touched.lastName && errors.lastName ? "danger" : "basic"
                  }
                />
                <Input
                  style={styles.input}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  placeholder="Your phone number"
                  keyboardType="number-pad"
                  label="Phone Number"
                />
                <Input
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Your Email Address"
                  keyboardType="email-address"
                  label="Email*"
                  onBlur={() => setFieldTouched("email")}
                  caption={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  status={touched.email && errors.email ? "danger" : "basic"}
                />

                <View style={styles.input}>
                  <Text
                    style={styles.moveInLabel}
                    category={"label"}
                    appearance={"hint"}
                  >
                    Move-In Date
                  </Text>
                  <Pressable
                    onPress={() => setShowCalendar(true)}
                    style={styles.pickedDate}
                  >
                    <Text style={styles.pickedDateText}>
                      {pickedDate?.toDateString()}
                    </Text>
                  </Pressable>
                </View>

                {showCalendar && (
                  <DateTimePicker
                    value={pickedDate}
                    mode="date"
                    onChange={(event: any, selectedDate?: Date) => {
                      if (selectedDate) {
                        setShowCalendar(false);
                        setPickedDate(selectedDate);
                      }
                    }}
                  />
                )}

                <Input
                  style={styles.input}
                  value={values.message}
                  onChangeText={handleChange("message")}
                  label="Custom Message"
                  multiline
                  onBlur={() => setFieldTouched("message")}
                  caption={
                    touched.message && errors.message
                      ? errors.message
                      : undefined
                  }
                  status={
                    touched.message && errors.message ? "danger" : "basic"
                  }
                />

                <Button
                  style={styles.sendMessageButton}
                  onPress={() => handleSubmit()}
                >
                  Send Message
                </Button>
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  row: { alignItems: "center", paddingVertical: 10 },
  address: { marginLeft: 10 },
  image: { height: 50, width: 70 },
  input: {
    marginTop: 10,
  },
  moveInLabel: { paddingVertical: 5 },
  pickedDate: {
    borderColor: "#e8e8e8",
    borderRadius: 3,
    borderWidth: 1,
    height: 40,
    paddingLeft: 15,
    backgroundColor: "#f7f9fc",
  },
  pickedDateText: { marginTop: 7 },
  sendMessageButton: { marginTop: 20 },
});
