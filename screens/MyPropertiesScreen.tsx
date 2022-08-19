import { StyleSheet, FlatList, View } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import axios from "axios";
import LottieView from "lottie-react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { Screen } from "../components/Screen";
import { useAuth } from "../hooks/useAuth";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { Property } from "../types/property";
import { endpoints } from "../constants";
import { Loading } from "../components/Loading";
import { Card } from "../components/Card";
import { ModalHeader } from "../components/ModalHeader";
import { theme } from "../theme";

export const MyPropertiesScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const properties = useQuery("myproperties", async () => {
    if (user)
      return axios.get<Property[]>(
        `${endpoints.getPropertiesByUserID}${user.ID}`
      );
  });

  const addPropertyNavigation = () => {
    navigation.navigate("AddProperty");
  };

  if (!user) return <SignUpOrSignInScreen />;

  if (properties.isLoading || properties.isFetching) return <Loading />;

  return (
    <Screen>
      {properties.data?.data && properties.data?.data.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <>
              <Button
                accessoryLeft={
                  <Entypo
                    name="plus"
                    size={16}
                    color={theme["color-primary-500"]}
                  />
                }
                appearance={"ghost"}
                size="small"
                style={styles.button}
                onPress={addPropertyNavigation}
              >
                Add a Property
              </Button>
              <Button
                accessoryLeft={
                  <MaterialCommunityIcons
                    name="refresh"
                    size={16}
                    color={theme["color-primary-500"]}
                  />
                }
                appearance={"ghost"}
                size="small"
                style={styles.button}
                onPress={() => properties.refetch()}
              >
                Refresh All
              </Button>
            </>
          }
          data={properties.data.data}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              property={item}
              myProperty
              onPress={() =>
                navigation.navigate("EditProperty", { propertyID: item.ID })
              }
            />
          )}
          keyExtractor={(item) => item.ID.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <>
          <ModalHeader xShown text="JPApartments" />
          <View style={styles.noPropertiesContainer}>
            <LottieView
              autoPlay
              style={styles.lottie}
              source={require("../assets/lotties/AddProperty.json")}
            />
            <Text category={"h6"} style={styles.text}>
              You Have No Properties
            </Text>
            <Text appearance={"hint"} style={[styles.text, styles.bottomText]}>
              Add a property and start renting!
            </Text>

            <Button
              style={styles.addPropertyButton}
              onPress={addPropertyNavigation}
            >
              Add Property
            </Button>
          </View>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  noPropertiesContainer: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  card: {
    marginVertical: 10,
  },
  button: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
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
  addPropertyButton: {
    marginTop: 20,
  },
});
