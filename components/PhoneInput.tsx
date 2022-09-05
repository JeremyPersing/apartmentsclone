import { StyleSheet, View, ViewStyle } from "react-native";
import { useState, useRef, Ref } from "react";
import { Text } from "@ui-kitten/components";
import RNPhoneInput from "react-native-phone-number-input";

import { theme } from "../theme";

export const PhoneInput = ({
  onChangeText,
  phoneNumber,
  phoneRef,
  countryCode,
  error,
  style,
  onBlur,
}: {
  onChangeText: (text: string) => void | undefined;
  phoneNumber: string;
  phoneRef?: Ref<RNPhoneInput> | null;
  countryCode?: string;
  error?: string;
  style?: ViewStyle | ViewStyle[];
  onBlur?: () => void;
}) => {
  const [borderColor, setBorderColor] = useState(theme["color-light-gray"]);
  if (!phoneRef) phoneRef = useRef<RNPhoneInput>(null);

  return (
    <View style={style}>
      <Text appearance={"hint"} category={"c1"} style={styles.label}>
        Phone
      </Text>

      <RNPhoneInput
        ref={phoneRef}
        onChangeText={onChangeText}
        value={phoneNumber}
        defaultCode={countryCode ? (countryCode as any) : "US"}
        containerStyle={[
          {
            borderColor: error ? theme["color-danger-500"] : borderColor,
          },
          styles.containerStyle,
          styles.input,
        ]}
        textInputProps={{
          selectionColor: theme["color-success-300"],
          dataDetectorTypes: "phoneNumber",
          onFocus(e) {
            setBorderColor(theme["color-primary-500"]);
          },
          onBlur(e) {
            if (onBlur) onBlur();
            setBorderColor(theme["color-light-gray"]);
            if (
              !(phoneRef as any).current?.isValidNumber(phoneNumber) &&
              phoneNumber !== ""
            ) {
              setBorderColor(theme["color-danger-500"]);
            }
          },
          style: styles.textInputStyle,
        }}
        layout="second"
        textContainerStyle={styles.textContainer}
      />

      {borderColor === theme["color-danger-500"] || error ? (
        <Text category="c1" style={styles.errorText}>
          {error ? error : "Invalid Phone Number"}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  label: { fontWeight: "bold", marginBottom: -5 },
  containerStyle: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginTop: 0,
    backgroundColor: "#f7f9fc",
  },
  textInputStyle: {
    width: "100%",
    height: 40,
    fontSize: 15,
  },
  textContainer: {
    borderRadius: 5,
  },
  errorText: { color: theme["color-danger-500"] },
});
