import MapView, { Region } from "react-native-maps";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { Button } from "@ui-kitten/components";
import axios from "axios";

import { Property } from "../types/property";
import { MapMarker } from "./MapMarker";
import { theme } from "../theme";
import { Card } from "./Card";
import { getPropertiesInArea } from "../data/properties";
import { endpoints, queryKeys } from "../constants";
import { useSearchPropertiesQuery } from "../hooks/queries/useSearchPropertiesQuery";

// used to persist the region if search area from the map
let mapRegion: Region | undefined = undefined;

export const Map = ({
  properties,
  mapRef,
  location,
  setLocation,
  initialRegion,
}: {
  properties: Property[];
  mapRef: React.MutableRefObject<MapView | null>;
  location: string;
  setLocation: (location: string) => void;
  initialRegion?: Region | undefined;
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [boundingBox, setBoundingBox] = useState<number[]>([]); // used for searching properties in region
  const [region, setRegion] = useState<Region | undefined>(
    mapRegion ? mapRegion : undefined
  );
  const navigation = useNavigation();

  const searchProperties = useSearchPropertiesQuery(boundingBox);

  useEffect(() => {
    if (location === "Map Area") return;

    if (initialRegion) {
      setShowSearchAreaButton(false);
      setRegion(initialRegion);
    }
  }, [initialRegion]);

  const unFocusProperty = () => {
    setActiveIndex(-1);
    navigation.setOptions({ tabBarStyle: { display: "flex" } });
  };

  const handleMapPress = () => {
    if (Platform.OS === "android") unFocusProperty();
  };

  const handleMarkerPress = (index: number) => {
    setTimeout(() => {
      mapRef.current?.animateCamera({
        center: {
          latitude: properties[index].lat,
          longitude: properties[index].lng,
        },
      });
    }, 100);
    setTimeout(() => {
      const newRegion: Region = {
        latitude: properties[index].lat,
        latitudeDelta:
          region?.latitudeDelta && region.latitudeDelta < 4
            ? region.latitudeDelta
            : 4,
        longitude: properties[index].lng,
        longitudeDelta:
          region?.longitudeDelta && region.longitudeDelta < 4
            ? region.longitudeDelta
            : 4,
      };

      setRegion(newRegion);
    }, 600);

    setActiveIndex(index);
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  };

  const handleSearchAreaButtonPress = () => {
    searchProperties.refetch();
    setLocation("Map Area");
    mapRegion = region;
    setShowSearchAreaButton(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={"google"}
        style={styles.map}
        userInterfaceStyle={"light"}
        ref={mapRef}
        onPress={handleMapPress}
        region={region}
        onRegionChangeComplete={(region, isGesture) => {
          if (isGesture?.isGesture) {
            if (!showSearchAreaButton) setShowSearchAreaButton(true);

            const newBoundingBox = [
              region.latitude - region.latitudeDelta / 2,
              region.latitude + region.latitudeDelta / 2,
              region.longitude - region.longitudeDelta / 2,
              region.longitude + region.longitudeDelta / 2,
            ];
            setRegion(region);
            setBoundingBox(newBoundingBox);
          }
        }}
      >
        {properties &&
          properties.map((i, index) => (
            <MapMarker
              key={i.ID}
              lat={i.lat}
              lng={i.lng}
              color={
                activeIndex === index
                  ? theme["color-info-400"]
                  : theme["color-primary-500"]
              }
              onPress={() => handleMarkerPress(index)}
            />
          ))}
      </MapView>
      {activeIndex > -1 && (
        <>
          {Platform.OS === "ios" && (
            <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
              <MaterialCommunityIcons
                name="close"
                color={theme["color-primary-500"]}
                size={24}
              />
            </TouchableOpacity>
          )}
          <Card
            property={properties[activeIndex]}
            style={styles.card}
            onPress={() =>
              navigation.navigate("PropertyDetails", {
                propertyID: properties[activeIndex].ID,
              })
            }
          />
        </>
      )}
      {showSearchAreaButton && activeIndex === -1 && (
        <Button
          style={styles.searchAreaButton}
          appearance={"ghost"}
          onPress={handleSearchAreaButtonPress}
        >
          Search Area
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  card: {
    position: "absolute",
    bottom: 10,
  },
  exit: {
    backgroundColor: "#fff",
    padding: 10,
    position: "absolute",
    top: 170,
    left: 15,
    borderRadius: 30,
  },
  searchAreaButton: {
    position: "absolute",
    bottom: 30,
    zIndex: 100,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: theme["color-gray"],
    borderWidth: 1,
  },
});
