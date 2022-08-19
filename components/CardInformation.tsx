import { View, StyleSheet } from "react-native";
import { Text, Button, Divider } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../theme";
import { Property } from "../types/property";
import { Row } from "./Row";
import { callPhoneNumber } from "../utils/callPhoneNumber";
import { getStateAbbreviation } from "../utils/getStateAbbreviation";

export const CardInformation = ({
  property,
  myProperty,
}: {
  property: Property;
  myProperty?: boolean;
}) => {
  const navigation = useNavigation();

  const DefaultInfo = () => (
    <>
      {property?.rentLow && property?.rentHigh && (
        <Row style={styles.rowJustification}>
          <Text category={"s1"}>
            ${property.rentLow.toLocaleString()} -{" "}
            {property.rentHigh.toLocaleString()}
          </Text>
          <MaterialCommunityIcons
            name="heart-outline"
            color={theme["color-primary-500"]}
            size={24}
          />
        </Row>
      )}
      <Text category={"c1"}>
        {property.bedroomLow === 0 ? "Studio" : property.bedroomLow} -{" "}
        {property.bedroomHigh} Beds
      </Text>
      <Text category={"c1"} style={styles.defaultMarginTop}>
        {property.name}
      </Text>
      <Text category={"c1"}>{property.street}</Text>
      <Text category={"c1"}>
        {property.city}, {property.state} {property.zip}
      </Text>

      {property?.tags ? (
        <Text category={"c1"} style={styles.defaultMarginTop}>
          {property.tags.map((tag, index) =>
            index === property.tags.length - 1 ? tag : `${tag}, `
          )}
        </Text>
      ) : null}

      <Row style={[styles.defaultMarginTop, styles.rowJustification]}>
        <Button
          appearance={"ghost"}
          style={[
            {
              borderColor: theme["color-primary-500"],
            },
            styles.button,
          ]}
          size="small"
          onPress={() =>
            navigation.navigate("Message", { propertyID: property.ID })
          }
        >
          Email
        </Button>
        <Button
          style={styles.button}
          size="small"
          onPress={() => callPhoneNumber(property.phoneNumber)}
        >
          Call
        </Button>
      </Row>
    </>
  );

  const MyPropertyInfo = () => (
    <>
      <Text category={"s1"}>
        {property?.name
          ? property.name
          : `${property.street}, ${property.city}, ${getStateAbbreviation(
              property.state
            )} ${property.zip}`}
      </Text>
      <Row style={[styles.rowAlign, styles.defaultMarginTop]}>
        {property?.apartments && property.apartments.length > 0 ? (
          <Text category={"c1"}>
            {property.apartments.length}{" "}
            {property.apartments.length > 1 ? "Units" : "Unit"}
          </Text>
        ) : null}
        <Button appearance={"ghost"} status="info" size={"small"}>
          Manage Units
        </Button>
      </Row>

      <Divider style={styles.divider} />

      <Row
        style={[
          styles.defaultMarginTop,
          styles.rowJustification,
          styles.rowAlign,
        ]}
      >
        <Text category={"s2"}>
          Listing: {property?.onMarket ? "On Market" : "Off Market"}
        </Text>
        <Button size={"small"} appearance="ghost" status={"info"}>
          {property?.onMarket ? "Deactivate" : "Reactivate"}
        </Button>
      </Row>
    </>
  );

  return (
    <View style={styles.informationContainer}>
      {myProperty ? <MyPropertyInfo /> : <DefaultInfo />}
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  defaultMarginTop: {
    marginTop: 5,
  },
  divider: {
    backgroundColor: theme["color-gray"],
  },
  rowAlign: { alignItems: "center" },
  rowJustification: {
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
  },
});
