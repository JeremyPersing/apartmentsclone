import { ScrollView, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "@ui-kitten/components";

import { Screen } from "../components/Screen";
import { SignUpAndSignInButtons } from "../components/SignUpAndSignInButtons";
import { theme } from "../theme";
import { ButtonList } from "../components/ButtonList";
import { useUser } from "../hooks/useUser";

export const AccountScreen = () => {
  const { user, logout } = useUser();
  const navigation = useNavigation();

  const firstSignedOutButtons = [
    {
      label: "Add a Property",
      onPress: () => navigation.navigate("AddProperty"),
    },
    {
      label: "View My Properties",
      onPress: () => navigation.navigate("MyProperties"),
    },
  ];

  const supportButtons = [
    {
      label: "Help Center",
      onPress: () => console.log("navigate to Help Center"),
    },
    {
      label: "Terms and Conditions",
      onPress: () => console.log("navigate to Terms and Conditions"),
    },
  ];

  const rentingButtons = [
    {
      label: "Favorite Properties",
      onPress: () => navigation.navigate("Root", { screen: "Saved" }),
    },
    {
      label: "Rental Applications",
      onPress: () => console.log("navigate to Rental Applications"),
    },
    {
      label: "My Residences",
      onPress: () => navigation.navigate("MyProperties"),
    },
    {
      label: "Rent Payments",
      onPress: () => console.log("navigate to Rent Payments"),
    },
  ];

  const accountButtons = [
    {
      label: "Account Settings",
      onPress: () =>
        navigation.navigate("Root", {
          screen: "AccountRoot",
          params: {
            screen: "Settings",
          },
        }),
    },
    {
      label: "Billing History",
      onPress: () => console.log("navigate to Billing History"),
    },
    {
      label: "Banks and Cards",
      onPress: () => console.log("navigate to Banks and Cards"),
    },
    {
      label: "Messages",
      onPress: () =>
        navigation.navigate("Root", {
          screen: "AccountRoot",
          params: {
            screen: "Conversations",
          },
        }),
    },
  ];

  const rentalManagementButtons = [
    {
      label: "Add a Property",
      onPress: () => navigation.navigate("AddProperty"),
    },
    {
      label: "Add Apartment to Property",
      onPress: () => console.log("navigate to MyProperties"),
    },
    {
      label: "View My Properties",
      onPress: () => navigation.navigate("MyProperties"),
    },
  ];

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.defaultMarginHorizontal}>
          {user ? (
            <>
              <Text style={styles.userName} category={"h4"}>
                Welcome{user.firstName ? `, ${user.firstName}` : ""}
              </Text>
              <Text style={styles.email} category={"h6"}>
                {user.email}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.header} category={"h5"}>
                Renting has never been easier!
              </Text>

              <SignUpAndSignInButtons />
              <View style={styles.middleContainer}>
                <Text category={"s1"} style={styles.subheader}>
                  Are you a property owner or manager?
                </Text>
                <Text style={styles.bodyText}>
                  Visit our website to access our full suite of rental
                  management tools and start receiving applications in minutes!
                </Text>
              </View>
            </>
          )}
        </View>
        {user ? (
          <>
            <ButtonList data={rentingButtons} header={"Renting Made Easy"} />
            <ButtonList data={accountButtons} header={"My Account"} />
            <ButtonList
              data={rentalManagementButtons}
              header={"Rental Manager Tools"}
            />
            <ButtonList data={supportButtons} header={"Support"} />
            <View
              style={[
                styles.specialMarginVertical,
                styles.defaultMarginHorizontal,
              ]}
            >
              <Button
                appearance={"ghost"}
                style={styles.button}
                onPress={logout}
              >
                Sign Out
              </Button>
            </View>
          </>
        ) : (
          <>
            <ButtonList data={firstSignedOutButtons} borderTop />
            <ButtonList data={supportButtons} header="Support" marginTop />
            <Text
              appearance={"hint"}
              style={[styles.brandText, styles.specialMarginVertical]}
            >
              JeremyPersing.com Version 1.0.0
            </Text>
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMarginHorizontal: { marginHorizontal: 10 },
  userName: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  email: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
  },
  header: {
    textAlign: "center",
    marginVertical: 25,
    marginHorizontal: 70,
    fontWeight: "600",
  },
  middleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 50,
    borderTopColor: theme["color-gray"],
    borderTopWidth: 2,
  },
  subheader: { textAlign: "center", paddingHorizontal: 20 },
  bodyText: { marginTop: 10, textAlign: "center", marginHorizontal: 15 },
  button: { marginBottom: 15, borderColor: theme["color-primary-500"] },
  specialMarginVertical: { marginTop: 30, marginBottom: 20 },
  brandText: {
    textAlign: "center",
  },
});
