import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Divider } from "@ui-kitten/components";

import { Row } from "../Row";
import { theme } from "../../theme";
import { ImageCarousel } from "../ImageCarousel";
import { pickImage } from "../../utils/pickImage";
import { DescriptionInput } from "../DescriptionInput";

export const GeneralPropertyInfo = ({
  images,
  description,
  setFieldValue,
}: {
  images: string[];
  description: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  return (
    <View>
      <Text style={styles.header} category="h6">
        General Property Info
      </Text>

      {images.length < 10 ? (
        <View style={styles.largeMarginTop}>
          <Text style={styles.smallHeader}>Photos</Text>
          <TouchableOpacity
            onPress={() => pickImage(images, "images", setFieldValue)}
            style={styles.photoButton}
          >
            <Row style={styles.row}>
              <MaterialCommunityIcons
                name="cloud-upload-outline"
                size={24}
                color={"black"}
                style={styles.icon}
              />
              <Text status="info">Upload Photos</Text>
            </Row>
            <Text style={styles.photoText} category="c2" appearance={"hint"}>
              Photos must be in jpg or png format, and no larger than 10 MB in
              size.
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {images.length > 0 ? (
        <ImageCarousel
          images={images}
          xShown
          field={"images"}
          setImages={setFieldValue}
          style={styles.largeMarginTop}
        />
      ) : null}

      <View style={styles.largeMarginTop}>
        <Text style={styles.smallHeader}>Description (optional)</Text>
        <DescriptionInput
          field="description"
          setDescription={setFieldValue}
          value={description}
        />
      </View>

      <Divider style={[styles.divider, styles.largeMarginTop]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    paddingVertical: 10,
  },
  smallHeader: { fontWeight: "bold", marginBottom: 5 },
  largeMarginTop: { marginTop: 30 },
  row: { alignItems: "center" },
  icon: { marginRight: 10 },
  photoText: {
    textAlign: "center",
    fontStyle: "italic",
  },
  photoButton: {
    borderColor: theme["color-primary-500"],
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "dashed",
    padding: 30,
    backgroundColor: theme["color-primary-100"],
    opacity: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginVertical: 10,
  },
});
