import {
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  ImageStyle,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Text } from "@ui-kitten/components";

import { WIDTH } from "../constants";

export const ImageCarousel = ({
  images,
  onImagePress,
  chevronsShown,
  indexShown,
  imageStyle,
}: {
  images: string[];
  onImagePress?: () => void;
  chevronsShown?: boolean;
  indexShown?: boolean;
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
    <>
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        pagingEnabled
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item }) => (
          <Pressable onPress={onImagePress}>
            <Image source={{ uri: item }} style={[styles.image, imageStyle]} />
          </Pressable>
        )}
        keyExtractor={(item) => item}
      />

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
    </>
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
});
