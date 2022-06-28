import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

import { Screen } from "./Screen";

export const Loading = () => {
  const animation = useRef<LottieView | null>(null);
  // Autoplay is not working so we use a ref to start animation
  setTimeout(() => {
    animation.current?.play();
  }, 100);

  return (
    <Screen style={styles.container}>
      <LottieView
        ref={animation}
        source={require("../assets/lotties/Loading.json")}
        style={styles.lottie}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 250,
    width: 250,
  },
});
