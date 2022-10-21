import { View, StyleSheet, Pressable } from "react-native";
import { Text, Button, Divider } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../theme";
import { Property } from "../types/property";
import { Row } from "./Row";
import { callPhoneNumber } from "../utils/callPhoneNumber";
import { getStateAbbreviation } from "../utils/getStateAbbreviation";
import { useUser } from "../hooks/useUser";
import { useSavePropertyMutation } from "../hooks/mutations/useSavePropertyMutation";

export const CardInformation = ({
  property,
  myProperty,
}: {
  property: Property;
  myProperty?: boolean;
}) => {
  const navigation = useNavigation();
  const { user, setSavedProperties } = useUser();
  const saveProperty = useSavePropertyMutation();

  const alterUsersSavedProperties = (
    propertyID: number,
    type: "add" | "remove"
  ) => {
    let newProperties: number[] = user?.savedProperties
      ? [...user.savedProperties]
      : [];

    if (type === "add") newProperties.push(propertyID);
    else newProperties = newProperties.filter((i) => i !== propertyID);

    setSavedProperties(newProperties);
  };

  const handleHeartPress = () => {
    if (!user) return alert("Please sign up or sign in to save properties");
    let op: "add" | "remove" = "add";
    if (property?.liked) op = "remove";

    alterUsersSavedProperties(property.ID, op);
    saveProperty.mutate({ propertyID: property.ID, op });
  };

  const manageUnitsNavigation = () =>
    navigation.navigate("ManageUnits", { propertyID: property.ID });

  const emailNavigation = () =>
    navigation.navigate("MessageProperty", { propertyID: property.ID });

  const editPropertyNavigation = () =>
    navigation.navigate("EditProperty", { propertyID: property.ID });

  const getLowAndHighText = (type: "rent" | "bedroom") => {
    if (type === "rent") {
      if (property.rentLow === property.rentHigh)
        return `$${property.rentLow.toLocaleString()}`;
      return `$${property.rentLow.toLocaleString()} - ${property.rentHigh.toLocaleString()}`;
    }

    let bedLow = property.bedroomLow === 0 ? "Studio" : property.bedroomLow;
    if (property.bedroomLow === property.bedroomHigh) return bedLow;

    return `${bedLow} - ${property.bedroomHigh} Beds`;
  };

  const DefaultInfo = () => (
    <>
      {property?.rentLow && property?.rentHigh && (
        <Row style={styles.rowJustification}>
          <Text category={"s1"}>{getLowAndHighText("rent")}</Text>
          <Pressable onPress={handleHeartPress} style={styles.heartContainer}>
            <MaterialCommunityIcons
              name={property?.liked ? "heart" : "heart-outline"}
              color={theme["color-primary-500"]}
              size={24}
            />
          </Pressable>
        </Row>
      )}
      <Text category={"c1"}>{getLowAndHighText("bedroom")}</Text>
      {property?.name ? (
        <Text category={"c1"} style={styles.defaultMarginTop}>
          {property.name}
        </Text>
      ) : null}
      <Text category={"c1"}>{property.street}</Text>
      <Text category={"c1"}>
        {property.city}, {property.state} {property.zip}
      </Text>

      {property?.includedUtilities && property.includedUtilities.length > 0 ? (
        <Text category={"c1"} style={styles.defaultMarginTop}>
          {property.includedUtilities.map((tag, index) => {
            return property.includedUtilities &&
              index === property.includedUtilities.length - 1
              ? tag
              : `${tag}, `;
          })}
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
          onPress={emailNavigation}
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
        <Button
          appearance={"ghost"}
          status="info"
          size={"small"}
          onPress={manageUnitsNavigation}
        >
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
        <Button
          size={"small"}
          appearance="ghost"
          status={"info"}
          onPress={editPropertyNavigation}
        >
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
  heartContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
});
