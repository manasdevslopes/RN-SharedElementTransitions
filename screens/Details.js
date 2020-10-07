import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import MarketingSlider from "../Components/MarketingSlider";
import { DATA } from "../config/travel.js";
import { ITEM_WIDTH, width, SPACING, ICON_SIZE } from "../config/theme.js";
import Icon from "../Components/Icon";
import BackIcon from "../Components/BackIcon.js";
import { SharedElement } from "react-navigation-shared-element";

const Details = ({ navigation, route }) => {
  const { item } = route.params;
  const ref = React.useRef();
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
  const mountedAnimated = React.useRef(new Animated.Value(0)).current;
  const activeIndex = React.useRef(new Animated.Value(selectedItemIndex))
    .current;
  const activeIndexAnimation = React.useRef(
    new Animated.Value(selectedItemIndex)
  ).current;

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  });
  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const size = ICON_SIZE + SPACING * 2;
  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackIcon
        onPress={() => {
          animation(0).start(() => {
            navigation.goBack();
          });
        }}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          marginVertical: 20,
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
          transform: [{ translateX }],
        }}
      >
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <TouchableOpacity
              style={{ padding: SPACING }}
              key={item.id}
              onPress={() => {
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
            >
              <Animated.View style={{ alignItems: "center", opacity }}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
                <Text style={{ fontSize: 10 }}>{item.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.FlatList
        style={{ opacity: mountedAnimated, transform: [{ translateY }] }}
        ref={ref}
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
          activeIndex.setValue(newIndex);
        }}
        renderItem={({ item }) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 16,
              }}
              //   showsVerticalScrollIndicator={false}
            >
              <View style={{ padding: SPACING }}>
                <Text style={{ fontSize: 16 }}>
                  {Array(50).fill(`${item.title} inner Text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

Details.sharedElements = (route, otherRoute, showing) => {
  // const { item } = route.params;
  // return [`item.${item.id}.photo`];;
  return DATA.map((item) => `item.${item.id}.icon`);
};

export default Details;

const styles = StyleSheet.create({
  imageContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "#add",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: ICON_SIZE * 0.6,
    height: ICON_SIZE * 0.6,
    resizeMode: "contain",
  },
});
