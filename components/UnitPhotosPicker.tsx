import { FlatList, View, StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";

import { ModalHeader } from "./ModalHeader";
import { ImageCarousel } from "./ImageCarousel";

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
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.cancelled) {
      const basedImage = `data:image/jpeg;base64,${result.base64}`;
      const newImages = [...images];
      newImages.push(basedImage);

      setImages(field, newImages);
    }
  };

  const deleteImage = (
    index: number,
    flatListRef: React.MutableRefObject<FlatList<any> | null> | undefined
  ) => {
    const newImages = images.filter((i, idx) => index !== idx);
    setImages(field, newImages);
    // If we delete an image in the middle, the flatlist doesn't automatically move images past index forward
    if (
      index !== 0 &&
      index === images.length - 1 &&
      flatListRef &&
      flatListRef.current
    ) {
      flatListRef.current.scrollToIndex({ index: index - 1 });
    }
  };

  return (
    <View>
      <ModalHeader
        xShown
        text="Unit Photos"
        onPress={cancel ? cancel : undefined}
      />

      <Text style={styles.text}>Pick images for your unit</Text>

      {images.length > 0 ? (
        <View style={styles.largeMarginTop}>
          <ImageCarousel images={images} xShown onXPress={deleteImage} />
        </View>
      ) : null}

      <Button
        appearance={"ghost"}
        style={styles.largeMarginTop}
        onPress={pickImage}
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
