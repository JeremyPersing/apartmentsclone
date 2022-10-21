/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

import { AccountScreen } from "../screens/AccountScreen";
import { SavedScreen } from "../screens/SavedScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { FindLocationsScreen } from "../screens/FindLocationsScreen";
import { SignInScreen } from "../screens/SignInScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";
import { ResetPasswordScreen } from "../screens/ResetPasswordScreen";
import { MessagePropertyScreen } from "../screens/MessagePropertyScreen";
import {
  AccountTabParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "../theme";
import { PropertyDetailsScreen } from "../screens/PropertyDetailsScreen";
import { AddPropertyScreen } from "../screens/AddPropertyScreen";
import { EditPropertyScreen } from "../screens/EditPropertyScreen";
import { MyPropertiesScreen } from "../screens/MyPropertiesScreen";
import { ManageUnitsScreen } from "../screens/ManageUnitsScreen";
import { ReviewScreen } from "../screens/ReviewScreen";
import { useNotifications } from "../hooks/useNotifications";
import { AccountSettingsScreen } from "../screens/AccountSettingsScreen";
import { ConversationsScreen } from "../screens/ConversationsScreen";
import { MessagesScreen } from "../screens/MessagesScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="FindLocations"
          component={FindLocationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MessageProperty"
          component={MessagePropertyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProperty"
          component={AddPropertyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProperty"
          component={EditPropertyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProperties"
          component={MyPropertiesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageUnits"
          component={ManageUnitsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarActiveTintColor: theme["color-primary-500"],
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="magnify" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heart-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AccountRoot"
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-circle-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const AccountStackNavigator = createNativeStackNavigator<AccountTabParamList>();
const AccountStack = () => (
  <AccountStackNavigator.Navigator initialRouteName="Account">
    <AccountStackNavigator.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <AccountStackNavigator.Screen
      name="Settings"
      component={AccountSettingsScreen}
      options={{
        headerTitle: "Account Settings",
        headerBackTitle: "Back",
      }}
    />
    <AccountStackNavigator.Screen
      name="Conversations"
      component={ConversationsScreen}
      options={{ headerTitle: "Conversations", headerBackTitle: "Back" }}
    />
    <AccountStackNavigator.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        headerBackTitle: "Back",
      }}
    />
  </AccountStackNavigator.Navigator>
);

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}
