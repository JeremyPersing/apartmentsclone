import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";

import { Property } from "../../types/property";
import { getStateAbbreviation } from "../../utils/getStateAbbreviation";
import { Row } from "../Row";
import { MapMarker } from "../MapMarker";
import { theme } from "../../theme";
import { ScoreCard } from "../ScoreCard";

export const LocationSection = ({ property }: { property: Property }) => {
  return (
    <>
      <Text category={"h5"} style={styles.defaultVerticalMargin}>
        Location
      </Text>

      <Row style={styles.mapHeaderContainer}>
        <MaterialCommunityIcons name="map-outline" color="black" size={24} />
        <Text category={"h6"} style={styles.mapText}>
          Map
        </Text>
      </Row>

      <Text category={"c1"} appearance={"hint"}>
        {property.street}, {property.city},{" "}
        {getStateAbbreviation(property.state)} {property.zip}
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={"google"}
          style={styles.map}
          initialRegion={{
            latitude: property.lat,
            longitude: property.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapMarker
            color={theme["color-info-400"]}
            lat={property.lat}
            lng={property.lng}
          />
        </MapView>
      </View>

      {property.scores ? (
        <FlatList
          horizontal
          style={styles.defaultVerticalMargin}
          showsHorizontalScrollIndicator={false}
          data={property.scores}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <ScoreCard score={item} style={styles.scoreCard} />
          )}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  defaultVerticalMargin: { marginVertical: 10 },
  mapText: { marginLeft: 10 },
  mapHeaderContainer: { alignItems: "center", marginVertical: 15 },
  mapContainer: {
    width: "100%",
    height: 250,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  scoreCard: { marginRight: 10 },
});
