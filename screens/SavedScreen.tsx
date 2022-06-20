import { View, StyleSheet, FlatList } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import LottieView from "lottie-react-native";

import { Screen } from "../components/Screen";
import { Row } from "../components/Row";
import { theme } from "../theme";
import { properties } from "../data/properties";
import { Card } from "../components/Card";
import { Property } from "../types/property";
import { SignUpAndSignInButtons } from "../components/SignUpAndSignInButtons";

export const SavedScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const user = false;
  const likedProperties = undefined;
  const contactedProperties = undefined;
  const applicationProperties = undefined;

  const getButtonAppearance = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return "filled";
    return "ghost";
  };

  const handleButtonPress = (index: number) => {
    setActiveIndex(index);
  };

  const getBodyText = (heading: string, subHeading: string) => {
    return (
      <View style={styles.textContainer}>
        <Text category={"h6"} style={styles.text}>
          {heading}
        </Text>
        <Text appearance={"hint"} style={[styles.text, styles.subHeading]}>
          {subHeading}
        </Text>
      </View>
    );
  };

  const getPropertiesFlatList = (properties: Property[]) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={properties}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => <Card property={item} style={styles.card} />}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  const getBody = () => {
    if (activeIndex === 0) {
      if (likedProperties) return getPropertiesFlatList(likedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/Favorites.json")}
          />
          {getBodyText(
            "You do not have any favorites saved",
            "Tap the heart icon on rentals to add favorites"
          )}
          {!user && (
            <SignUpAndSignInButtons
              style={styles.signInAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
    if (activeIndex === 1) {
      if (contactedProperties)
        return getPropertiesFlatList(contactedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/Contacted.json")}
          />
          {getBodyText(
            "You have not contacted any properties yet",
            "Your contacted properties will show here"
          )}
          {!user && (
            <SignUpAndSignInButtons
              style={styles.signInAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
    if (applicationProperties)
      return getPropertiesFlatList(applicationProperties);
    return (
      <>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../assets/lotties/Applications.json")}
        />
        {getBodyText(
          "Check the status of your rental applications here",
          "Any properties that you have applied to will show here"
        )}
        {!user && (
          <SignUpAndSignInButtons
            style={styles.signInAndSignUpButtonContainer}
          />
        )}
      </>
    );
  };

  return (
    <Screen style={styles.screen}>
      <Row style={styles.buttonContainer}>
        <Button
          style={[styles.button, styles.favoritesButton]}
          size={"small"}
          appearance={getButtonAppearance(0)}
          onPress={() => handleButtonPress(0)}
        >
          Favorites
        </Button>
        <Button
          style={[styles.button, styles.contactedButton]}
          size={"small"}
          appearance={getButtonAppearance(1)}
          onPress={() => handleButtonPress(1)}
        >
          Contacted
        </Button>
        <Button
          style={[styles.button, styles.applicationButton]}
          size={"small"}
          appearance={getButtonAppearance(2)}
          onPress={() => handleButtonPress(2)}
        >
          Applications
        </Button>
      </Row>
      <View style={styles.container}>{getBody()}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    width: "33.3%",
    borderRadius: 0,
    borderColor: theme["color-primary-500"],
  },
  applicationButton: { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
  favoritesButton: { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
  contactedButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  container: { flex: 1, justifyContent: "center" },
  lottie: {
    height: 180,
    width: 180,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
  },
  textContainer: {
    marginVertical: 15,
  },
  signInAndSignUpButtonContainer: {
    marginTop: 15,
  },
  card: { marginHorizontal: 0, marginVertical: 5 },
});
