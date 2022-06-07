import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../components/Screen";
import { theme } from "../theme";
import { Row } from "../components/Row";
import { ModalHeader } from "../components/ModalHeader";
import { Location } from "../types/locationIQ";
import { getSuggestedLocations, searchLocations } from "../services/location";

export const FindLocationsScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  const handleChange = async (val: string) => {
    setValue(val);
    if (val.length > 2) {
      let locations = await getSuggestedLocations(val);
      if (locations.length > 0) setSuggestions(locations);
    } else if (val.length === 0) setSuggestions([]);
  };

  const handleSubmitEditing = async () => {
    let locations = await searchLocations(value);
    if (locations.length > 0) {
      console.log("locations", locations);
    }
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
      <Row style={styles.defaultMarginTop}>
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

  const getFormattedLocationText = (item: Location) => {
    let location = item.address.name;
    if (item.type === "city" && item.address.state)
      location += ", " + item.address.state;
    return location;
  };

  const handleNavigate = (location: Location) => {
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
        {/* If rendered like <getInput /> this will rerender after every char input */}
        {getInput()}
        {suggestions.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={suggestions}
            keyExtractor={(item, index) => item.place_id + index}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(item);
                }}
              >
                <SuggestedText locationItem={item} />
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    marginHorizontal: 10,
  },
  defaultMarginTop: { marginTop: 10 },
  suggestionContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["color-gray"],
  },
});
