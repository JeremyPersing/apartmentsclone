import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";

export const TextMoreOrLess = ({
  children,
  initialLines = 1,
}: {
  children: string;
  initialLines: number;
}) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = (e: { nativeEvent: { lines: any } }) => {
    const { lines } = e.nativeEvent;
    if (lines && Array.isArray(lines) && lines.length > 0) {
      // There is more text that can be shown
      // Needs to be >= to work on both ios and android
      // if just > it won't work on ios
      if (lines.length >= initialLines) {
        setLengthMore(true);
      }
    }
  };

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : initialLines}
        category={"c1"}
      >
        {children}
      </Text>

      {lengthMore ? (
        <TouchableOpacity
          style={styles.lengthMoreTextContainer}
          onPress={toggleNumberOfLines}
        >
          <Text category={"c1"} status={"info"}>
            {textShown ? "Read less" : "Read more"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  lengthMoreTextContainer: {
    paddingVertical: 5,
    zIndex: 30,
  },
});
