import { Animated, View } from "react-native";
import { useState } from "react";
import MapView from "react-native-maps";

import { Screen } from "../components/Screen";
import { HEADERHEIGHT, LISTMARGIN } from "../constants";
import { Card } from "../components/Card";
import { AnimatedListHeader } from "../components/AnimatedListHeader";
import { properties } from "../data/properties";
import { Map } from "../components/Map";

export const SearchScreen = () => {
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [scrollAnimation] = useState(new Animated.Value(0));

  return (
    <Screen>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
      />
      {mapShown ? (
        <Map properties={properties} />
      ) : (
        <Animated.FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
          bounces={false}
          scrollEventThrottle={16}
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 5 }} property={item} />
          )}
        />
      )}
    </Screen>
  );
};
