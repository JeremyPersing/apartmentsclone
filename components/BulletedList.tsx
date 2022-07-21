import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import { Row } from "./Row";
import { BlackDot } from "./BlackDot";

export const BulletedList = ({
  data,
  heading,
  style,
}: {
  data: string[];
  heading?: string;
  style?: ViewStyle | ViewStyle[];
}) => {
  let rows: any[] = [];

  for (let i = 0; i < data.length; i++) {
    let component;
    if (data.length - i >= 2) {
      component = (
        <Row style={styles.mainRow}>
          <Row style={styles.secondaryRow}>
            <BlackDot style={styles.blackDot} />
            <Text category={"c1"}>{data[i]}</Text>
          </Row>
          <Row style={styles.secondaryRow}>
            <BlackDot style={styles.blackDot} />
            <Text category={"c1"}>{data[i + 1]}</Text>
          </Row>
        </Row>
      );
    } else {
      component = (
        <Row style={styles.mainRow}>
          <Row style={styles.secondaryRow}>
            <BlackDot style={styles.blackDot} />
            <Text category={"c1"}>{data[i]}</Text>
          </Row>
        </Row>
      );
    }
    rows.push(component);
    i++;
  }

  return (
    <View style={[styles.container, style]}>
      {heading ? (
        <Text style={styles.heading} category={"s1"}>
          {heading}
        </Text>
      ) : null}
      {rows.map((item, index) => (
        <View key={index}>{item}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 5, paddingVertical: 10 },
  heading: { paddingVertical: 8 },
  mainRow: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  secondaryRow: {
    paddingVertical: 5,
    width: "45%",
  },
  blackDot: { alignSelf: "flex-start" },
});
