import { useState } from "react";
import { Share, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { Property } from "../../types/property";
import { theme } from "../../theme";
import { Row } from "../Row";
import { getStateAbbreviation } from "../../utils/getStateAbbreviation";

export const PropertyHeaderSection = ({ property }: { property: Property }) => {
  const [heartIconName, setHeartIconName] = useState<"heart" | "heart-outline">(
    "heart-outline"
  );

  const handleHeartPress = () => {
    if (heartIconName === "heart") {
      return setHeartIconName("heart-outline");
    }
    setHeartIconName("heart");
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
      <Text category={"h5"} style={styles.defaultMarginVertical}>
        {property.name}
      </Text>
      <Row style={styles.containerRow}>
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
            name={heartIconName}
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
});
