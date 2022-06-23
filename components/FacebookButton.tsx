import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Text } from "@ui-kitten/components";

import { FacebookLogo } from "./logos/FacebookLogo";

WebBrowser.maybeCompleteAuthSession();

export const FacebookButton = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FacebookLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#3b5998",
    height: 50,
  },
  logo: { marginLeft: 10, marginTop: 1 },
  text: {
    color: "#fff",
    alignSelf: "center",
    marginLeft: 40, // specific margins to line up with the other social buttons
    fontWeight: "bold",
    fontSize: 15,
  },
});
