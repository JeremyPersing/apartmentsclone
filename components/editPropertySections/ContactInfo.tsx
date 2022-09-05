import { View, StyleSheet } from "react-native";
import { Text, Divider, Input } from "@ui-kitten/components";
import { FormikErrors, FormikTouched } from "formik";
import RNPhoneInput from "react-native-phone-number-input";

import { PhoneInput } from "../PhoneInput";
import { EditPropertyInitialValues } from "../../types/editPropertyInitialValues";
import { theme } from "../../theme";

export const ContactInfo = ({
  name,
  firstName,
  lastName,
  email,
  website,
  countryCode,
  phoneNumber,
  touched,
  errors,
  setFieldTouched,
  handleChange,
  phoneRef,
}: {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  countryCode: string;
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
        value={name}
        onChangeText={handleChange("name")}
        placeholder="Your Property Name"
        label="Property Name"
      />

      <Input
        style={styles.input}
        value={firstName}
        onChangeText={handleChange("firstName")}
        placeholder="Your First Name"
        label="First Name"
        autoComplete="name"
        textContentType="givenName"
      />
      <Input
        style={styles.input}
        value={lastName}
        onChangeText={handleChange("lastName")}
        placeholder="Your Last Name"
        label="Last Name"
        textContentType="familyName"
        autoComplete="name"
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
      <Input
        style={styles.input}
        value={website}
        onChangeText={handleChange("website")}
        placeholder="Your Website"
        autoCapitalize="none"
        keyboardType="web-search"
        textContentType="URL"
        autoCorrect={false}
        label="Website"
        onBlur={() => setFieldTouched("website")}
        caption={touched.website && errors.website ? errors.website : undefined}
        status={touched.website && errors.website ? "danger" : "basic"}
      />

      <PhoneInput
        onChangeText={handleChange("phoneNumber")}
        phoneNumber={phoneNumber}
        style={styles.input}
        phoneRef={phoneRef}
        error={
          touched.phoneNumber && errors.phoneNumber
            ? errors.phoneNumber
            : undefined
        }
        countryCode={countryCode}
        onBlur={() => setFieldTouched("phoneNumber")}
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
