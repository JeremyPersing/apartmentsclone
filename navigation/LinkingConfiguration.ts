/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Search: "search",
          Saved: "saved",
          Account: "account",
        },
      },
      FindLocations: "findlocations",
      ForgotPassword: "forgotpassword",
      Message: "message",
      PropertyDetails: "propertydetails",
      ResetPassword: { path: "resetpassword/:token" },
      SignIn: "signin",
      SignUp: "signup",
    },
  },
};

export default linking;
