import { StyleSheet, FlatList } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";

import { Property } from "../../types/property";
import { Row } from "../Row";
import { PetCard } from "../PetCard";
import { GeneralTextCard } from "../GeneralTextCard";
import { CatsAndDogs, CatsOnly, DogsOnly } from "../../constants/petValues";

export const LeaseAndFeesSection = ({ property }: { property: Property }) => {
  const leaseLengths = [];
  const leaseLengthExists = new Map<string, boolean>();

  let minDeposit = property.apartments[0].deposit;
  let maxDeposit = property.apartments[0].deposit;
  for (let apartment of property.apartments) {
    if (apartment.deposit > maxDeposit) maxDeposit = apartment.deposit;
    if (apartment.deposit < minDeposit) minDeposit = apartment.deposit;

    if (!leaseLengthExists.get(apartment.leaseLength)) {
      leaseLengths.push(apartment.leaseLength);
      leaseLengthExists.set(apartment.leaseLength, true);
    }
  }

  let downDepositBody = [];
  if (minDeposit === maxDeposit) downDepositBody.push(`$${minDeposit}`);
  else {
    downDepositBody.push(`Min: $${minDeposit}`);
    downDepositBody.push(`Max: $${maxDeposit}`);
  }

  const getPetsAllowedText = () => {
    if (property.petsAllowed === CatsAndDogs) return "Cats and Dogs Allowed";
    if (property.petsAllowed === CatsOnly) return "Only Cats Allowed";
    if (property.petsAllowed === DogsOnly) return "Only Dogs Allowed";
    return "No Pets Allowed";
  };

  return (
    <>
      <Text category={"h5"} style={styles.defaultMarginVertical}>
        Lease Detail & Fees
      </Text>
      {property.petsAllowed ? (
        <>
          <Row style={styles.row}>
            <MaterialIcons name="pets" color="black" size={24} />
            <Text category={"h6"} style={styles.rowText}>
              Pet Policies
            </Text>
          </Row>
          <GeneralTextCard heading="Pets" body={[getPetsAllowedText()]} />
        </>
      ) : null}
      {property.parkingFee ? (
        <>
          <Row style={styles.row}>
            <MaterialIcons name="attach-money" color="black" size={24} />
            <Text category={"h6"} style={styles.rowText}>
              Fees
            </Text>
          </Row>
          <GeneralTextCard
            heading="parking"
            body={[`${property.parkingFee}`]}
          />
        </>
      ) : null}

      <Row style={[styles.row, { paddingTop: 10 }]}>
        <MaterialIcons name="list-alt" color="black" size={24} />
        <Text category={"h6"} style={styles.rowText}>
          Details
        </Text>
      </Row>
      <FlatList
        style={styles.defaultMarginVertical}
        data={[
          {
            heading: "lease options",
            body: leaseLengths,
          },
          {
            heading: "Down Deposit",
            body: downDepositBody,
          },
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.heading}
        renderItem={({ item, index }) => (
          <GeneralTextCard
            heading={item.heading}
            body={item.body}
            style={styles.textCard}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
  row: { alignItems: "center", marginVertical: 15 },
  rowText: { marginLeft: 10 },
  petCard: { marginRight: 15 },
  textCard: { marginRight: 10 },
});
