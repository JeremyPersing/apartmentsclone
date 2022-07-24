import { View, StyleSheet, ViewStyle } from "react-native";
import { Text, Divider } from "@ui-kitten/components";

import { Pet } from "../types/pet";
import { Row } from "./Row";
import { theme } from "../theme";

const cardRow = (label: string, value: string, showDivider: boolean = true) => {
  return (
    <>
      <Row style={styles.cardRow}>
        <Text category={"c1"} style={styles.cardRowText}>
          {label}
        </Text>
        <Text category={"c1"} style={[styles.cardRowText]}>
          {value}
        </Text>
      </Row>
      {showDivider ? <Divider style={styles.divider} /> : null}
    </>
  );
};

export const PetCard = ({
  pet,
  style,
}: {
  pet: Pet;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text category={"c1"} style={styles.allowedText}>
        {`${pet.type}s`}
        {pet.allowed ? " Allowed" : " Not Allowed"}
      </Text>
      <Text category={"c1"}>{pet.details}</Text>
      {cardRow("Pet Limit", pet.limit.toString())}
      {pet.deposit ? cardRow("Pet Deposit", `$${pet.deposit}`) : null}
      {pet.rent ? cardRow("Monthly Pet Rent", `$${pet.rent}`) : null}
      {pet.fee ? cardRow("One Time Fee", `$${pet.fee}`) : null}
      {pet.interview
        ? cardRow("Pet Limit", "Required")
        : cardRow("Pet Limit", "Not Required")}
      {pet.neutered
        ? cardRow("Spayed/Neutered", "Required")
        : cardRow("Spayed/Neutered", "Not Required")}
      {pet.declawed
        ? cardRow("Declawed", "Required", false)
        : cardRow("Declawed", "Not Required", false)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
    padding: 7,
    width: 250,
  },
  allowedText: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardRow: { justifyContent: "space-between", paddingVertical: 5 },
  cardRowText: { fontWeight: "bold" },
  divider: { backgroundColor: theme["color-gray"] },
});
