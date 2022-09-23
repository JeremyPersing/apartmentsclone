import { useState } from "react";
import { Share, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { Property } from "../../types/property";
import { theme } from "../../theme";
import { Row } from "../Row";
import { getStateAbbreviation } from "../../utils/getStateAbbreviation";
import { useUser } from "../../hooks/useUser";
import { useSavePropertyMutation } from "../../hooks/mutations/useSavePropertyMutation";

export const PropertyHeaderSection = ({ property }: { property: Property }) => {
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

  const shareItem = async () => {
    try {
      await Share.share({
        message: "Check out this sweet apartment I found on JPArtments.com.",
      });
    } catch (error: unknown) {
      alert("Sorry, we're unable to share");
    }
  };

  return (
    <>
      {property.name ? (
        <Text category={"h5"} style={styles.defaultMarginTop}>
          {property.name}
        </Text>
      ) : null}
      <Row style={[styles.containerRow, styles.defaultMarginTop]}>
        <View>
          <Text category={"c1"}>{property.street}</Text>
          <Text category={"c1"}>{`${property.city}, ${getStateAbbreviation(
            property.state
          )} ${property.zip}`}</Text>
        </View>
        <Row style={styles.iconRow}>
          <MaterialIcons
            onPress={async () => {
              await shareItem();
            }}
            name="ios-share"
            size={30}
            color={theme["color-primary-500"]}
            style={styles.shareIcon}
          />
          <MaterialCommunityIcons
            onPress={handleHeartPress}
            name={property?.liked ? "heart" : "heart-outline"}
            size={30}
            color={theme["color-primary-500"]}
          />
        </Row>
      </Row>
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
  containerRow: {
    justifyContent: "space-between",
  },
  iconRow: { paddingRight: 5 },
  shareIcon: {
    marginRight: 20,
    marginTop: -4,
  },
  defaultMarginTop: { marginTop: 10 },
});
