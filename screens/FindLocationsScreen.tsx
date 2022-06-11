import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Input, Button, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "react-query";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { theme } from "../theme";
import { Row } from "../components/Row";
import { getSuggestedLocations } from "../services/location";
import { Location } from "../types/locationIQ";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { getFormattedLocationText } from "../utils/getFormattedLocationText";
import { RecentSearchList } from "../components/RecentSearchList";

export const FindLocationsScreen = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const recentSearches: Location[] | undefined =
    queryClient.getQueryData("recentSearches");

  const setRecentSearch = (location: Location) => {
    queryClient.setQueryData("recentSearches", () => {
      if (recentSearches) {
        let included = false;
        for (let i of recentSearches) {
          if (
            i.display_name === location.display_name &&
            i.lon === location.lon &&
            i.lat === location.lat
          ) {
            included = true;
            break;
          }
        }
        if (!included) return [location, ...recentSearches];
        return recentSearches;
      }
      return [location];
    });
  };

  const handleChange = async (val: string) => {
    setValue(val);
    if (val.length > 2) {
      const locations = await getSuggestedLocations(val);
      if (locations.length > 0) setSuggestions(locations);
    } else if (val.length === 0) setSuggestions([]);
  };

  const handleSubmitEditing = async () => {
    const locations = await getSuggestedLocations(value);
    if (locations.length > 0) {
      handleNavigate(locations[0]);
    }
  };

  const handleNavigate = (location: Location) => {
    setRecentSearch(location);
    navigation.navigate("Root", {
      screen: "Search",
      params: {
        location: getFormattedLocationText(location),
        lat: location.lat,
        lon: location.lon,
        boundingBox: location.boundingbox,
      },
    });
  };

  const getInput = () => {
    if (Platform.OS === "ios")
      return (
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter Location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={styles.defaultMarginTop}
        />
      );

    return (
      <Row>
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter Location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={[styles.defaultMarginTop, { width: "80%" }]}
        />
        <Button appearance={"ghost"} status="info" onPress={navigation.goBack}>
          Cancel
        </Button>
      </Row>
    );
  };

  const SuggestedText = ({ locationItem }: { locationItem: Location }) => {
    const location = getFormattedLocationText(locationItem);
    return (
      <Row style={styles.suggestionContainer}>
        <Text>{location}</Text>
      </Row>
    );
  };

  return (
    <Screen>
      {Platform.OS === "ios" ? <ModalHeader /> : null}
      <View style={styles.screenContent}>
        {getInput()}
        {suggestions.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={suggestions}
            keyExtractor={(item, index) => item.place_id + index}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  handleNavigate(item);
                }}
              >
                <SuggestedText locationItem={item} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <ScrollView bounces={false}>
            <CurrentLocationButton style={styles.currentLocationButton} />
            <RecentSearchList
              style={styles.recentSearchContainer}
              recentSearches={recentSearches}
            />
          </ScrollView>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    marginHorizontal: 10,
  },
  defaultMarginTop: {
    marginTop: 10,
  },
  suggestionContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["color-gray"],
  },
  currentLocationButton: {
    marginTop: 40,
  },
  recentSearchContainer: { marginTop: 30 },
});
