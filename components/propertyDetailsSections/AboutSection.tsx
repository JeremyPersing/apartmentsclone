import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";

import { Row } from "../Row";
import { Property } from "../../types/property";

export const AboutSection = ({ property }: { property: Property }) => {
  if (property.description)
    return (
      <>
        <Text category={"h5"} style={styles.header}>
          About
        </Text>
        {property?.name ? (
          <Row>
            <MaterialIcons color={"#36454f"} size={24} name="apartment" />

            <Text category={"h6"} style={styles.apartmentText}>
              {property?.name}
            </Text>
          </Row>
        ) : null}
        <Text category={"c1"}>{property.description}</Text>
      </>
    );

  return null;
};

const styles = StyleSheet.create({
  header: { marginBottom: 15, marginTop: 10 },
  apartmentText: { paddingLeft: 10, marginBottom: 10 },
});
