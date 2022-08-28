import { View, StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";

import { ModalHeader } from "./ModalHeader";
import { ImageCarousel } from "./ImageCarousel";
import { pickImage } from "../utils/pickImage";

export const UnitPhotosPicker = ({
  images,
  field,
  setImages,
  cancel,
}: {
  images: string[];
  field: string;
  setImages: (field: string, values: any) => void;
  cancel?: () => void;
}) => {
  return (
    <View>
      <ModalHeader
        xShown
        text="Unit Photos"
        onPress={cancel ? cancel : undefined}
      />

      <Text style={styles.text}>Pick images for your unit</Text>

      {images.length > 0 ? (
        <ImageCarousel
          images={images}
          xShown
          style={styles.largeMarginTop}
          field={field}
          setImages={setImages}
        />
      ) : null}

      <Button
        appearance={"ghost"}
        style={styles.largeMarginTop}
        onPress={() => pickImage(images, field, setImages)}
        disabled={images.length > 4 ? true : false}
      >
        Upload Photos
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "center", marginTop: 20 },
  largeMarginTop: { marginTop: 30 },
});
