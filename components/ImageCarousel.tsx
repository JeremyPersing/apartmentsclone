import {
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Text } from "@ui-kitten/components";

import { WIDTH } from "../constants";
import { theme } from "../theme";

export const ImageCarousel = ({
  images,
  onImagePress,
  chevronsShown,
  indexShown,
  xShown,
  field,
  setImages,
  style,
  imageStyle,
}: {
  images: string[];
  onImagePress?: () => void;
  chevronsShown?: boolean;
  indexShown?: boolean;
  xShown?: boolean;
  field?: string;
  setImages?: (field: string, values: any) => void;
  style?: ViewStyle[] | ViewStyle;
  imageStyle?: ImageStyle;
}) => {
  const flatListRef = useRef<FlatList | null>(null);
  const viewConfig = { viewAreaCoveragePercentThreshold: 95 };
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  const onXPress = (index: number) => {
    if (field && setImages) {
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
    }
  };

  const handlePressLeft = () => {
    if (activeIndex === 0)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: images.length - 1,
      });

    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
    });
  };

  const handlePressRight = () => {
    if (activeIndex === images.length - 1)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: 0,
      });

    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
    });
  };

  return (
    <View style={style}>
      {images && images.length > 0 ? (
        <FlatList
          ref={(ref) => (flatListRef.current = ref)}
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item, index }) => (
            <Pressable onPress={onImagePress}>
              <Image
                source={{ uri: item }}
                style={[styles.image, imageStyle]}
              />
              {xShown ? (
                <MaterialCommunityIcons
                  onPress={() => onXPress(index)}
                  style={styles.x}
                  name="close"
                  color={theme["color-primary-500"]}
                  size={20}
                />
              ) : null}
            </Pressable>
          )}
          keyExtractor={(item, index) => item + index}
        />
      ) : (
        <Pressable onPress={onImagePress}>
          <Image
            source={require("../assets/images/NoImage.jpeg")}
            style={[styles.image, imageStyle]}
          />
        </Pressable>
      )}

      {chevronsShown && (
        <>
          <Pressable
            style={[
              styles.chevron,
              {
                left: 5,
              },
            ]}
            onPress={handlePressLeft}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color="white"
              size={45}
            />
          </Pressable>
          <Pressable
            style={[styles.chevron, { right: 5 }]}
            onPress={handlePressRight}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              color="white"
              size={45}
            />
          </Pressable>
        </>
      )}

      {indexShown && (
        <View style={styles.index}>
          <Text category={"c2"} style={styles.indexText}>
            {activeIndex + 1} of {images.length} photos
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: WIDTH,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  chevron: {
    position: "absolute",
    top: 95,
  },
  index: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // use this to give the black background opacity but not the text
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  indexText: { color: "#fff" },
  x: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
