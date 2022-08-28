import { View, StyleSheet } from "react-native";
import { Text, Divider, Input } from "@ui-kitten/components";
import { FormikErrors, FormikTouched } from "formik";
import RNPhoneInput from "react-native-phone-number-input";

import { PhoneInput } from "../PhoneInput";
import { EditPropertyInitialValues } from "../../types/editPropertyInitialValues";
import { theme } from "../../theme";

export const ContactInfo = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  touched,
  errors,
  setFieldTouched,
  handleChange,
  phoneRef,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  touched: FormikTouched<EditPropertyInitialValues>;
  errors: FormikErrors<EditPropertyInitialValues>;
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
  phoneRef: React.RefObject<RNPhoneInput>;
}) => {
  return (
    <View>
      <Text category={"h6"} style={styles.header}>
        Contact Info
      </Text>
      <Input
        style={styles.input}
        value={firstName}
        onChangeText={handleChange("firstName")}
        placeholder="Your First Name"
        label="First Name"
        autoComplete="name"
        textContentType="givenName"
        onBlur={() => setFieldTouched("firstName")}
        caption={
          touched.firstName && errors.firstName ? errors.firstName : undefined
        }
        status={touched.firstName && errors.firstName ? "danger" : "basic"}
      />
      <Input
        style={styles.input}
        value={lastName}
        onChangeText={handleChange("lastName")}
        placeholder="Your Last Name"
        label="Last Name"
        textContentType="familyName"
        autoComplete="name"
        onBlur={() => setFieldTouched("lastName")}
        caption={
          touched.lastName && errors.lastName ? errors.lastName : undefined
        }
        status={touched.lastName && errors.lastName ? "danger" : "basic"}
      />
      <Input
        style={styles.input}
        value={email}
        onChangeText={handleChange("email")}
        placeholder="Your Email Address"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        autoCorrect={false}
        label="Email"
        onBlur={() => setFieldTouched("email")}
        caption={touched.email && errors.email ? errors.email : undefined}
        status={touched.email && errors.email ? "danger" : "basic"}
      />

      <PhoneInput
        onChangeText={handleChange("phoneNumber")}
        phoneNumber={phoneNumber}
        style={styles.input}
        phoneRef={phoneRef}
      />

      <Divider style={[styles.divider, styles.largeMarginTop]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    paddingVertical: 10,
  },
  largeMarginTop: { marginTop: 30 },
  input: {
    marginTop: 15,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginVertical: 10,
  },
});
