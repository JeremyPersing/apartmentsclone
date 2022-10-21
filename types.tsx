/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  FindLocations: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  PropertyDetails: { propertyID: number };
  MessageProperty: { propertyID: number; tour?: boolean };
  AddProperty: undefined;
  EditProperty: { propertyID: number };
  MyProperties: undefined;
  ManageUnits: { propertyID: number };
  Review: { propertyID: number; propertyName: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Search: undefined | SearchScreenParams;
  Saved: undefined;
  AccountRoot: NavigatorScreenParams<AccountTabParamList> | undefined;
};

export type AccountTabParamList = {
  Account: undefined;
  Settings: undefined;
  Conversations: undefined;
  Messages: { conversationID: number; recipientName: string };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SearchScreenParams = {
  location: string;
  boundingBox: string[];
  lat: string;
  lon: string;
};
