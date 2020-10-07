import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Easing,
  StatusBar,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import locations from "../config/data/locations.js";
import { tutorial2Spec } from "../config/theme.js";
import { SharedElement } from "react-navigation-shared-element";

const { ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULLSIZE } = tutorial2Spec;

export default function TravelList({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        data={locations}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULLSIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULLSIZE,
            index * FULLSIZE,
            (index + 1) * FULLSIZE,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push("TravelListDetails", { item });
              }}
              style={styles.itemContainer}
            >
              <SharedElement
                id={`item.${item.key}.photo`}
                style={[StyleSheet.absoluteFillObject]}
              >
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { overflow: "hidden", borderRadius: RADIUS },
                  ]}
                >
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      { resizeMode: "cover", transform: [{ scale }] },
                    ]}
                  />
                </View>
              </SharedElement>
              <SharedElement id={`item.${item.key}.location`}>
                <Animated.Text
                  style={[styles.locations, { transform: [{ translateX }] }]}
                >
                  {item.location}
                </Animated.Text>
              </SharedElement>
              <View style={styles.days}>
                <Text style={styles.daysValue}>{item.numberOfDays}</Text>
                <Text style={styles.daysLabel}>days</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
    margin: SPACING,
  },
  locations: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: SPACING * 2,
    left: SPACING * 2,
  },
  days: {
    position: "absolute",
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  daysValue: {
    fontWeight: "800",
    fontSize: 18,
    color: "#fff",
  },
  daysLabel: {
    fontSize: 11,
    color: "#fff",
  },
});
