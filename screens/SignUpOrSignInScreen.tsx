import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { SignUpAndSignInButtons } from "../components/SignUpAndSignInButtons";

export const SignUpOrSignInScreen = () => {
  return (
    <Screen>
      <ModalHeader text="JPApartments" xShown />
      <View style={styles.container}>
        <Text category={"h5"} style={styles.header}>
          Add Your Properties
        </Text>

        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../assets/lotties/AddProperty.json")}
        />

        <Text category={"h6"} style={styles.text}>
          Create an Account or Sign In
        </Text>
        <Text appearance={"hint"} style={[styles.text, styles.bottomText]}>
          To add your properties, you must create an account or sign in.
        </Text>

        <SignUpAndSignInButtons />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { marginVertical: 20, textAlign: "center" },
  lottie: {
    marginBottom: 50,
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 30,
  },
});
