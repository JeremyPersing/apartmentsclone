import { Dimensions, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export const Loading = () => {
  const animation = useRef<LottieView | null>(null);
  // Autoplay is not working so we use a ref to start animation
  setTimeout(() => {
    animation.current?.play();
  }, 100);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require("../assets/lotties/Loading.json")}
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 250,
    width: 250,
  },
});
