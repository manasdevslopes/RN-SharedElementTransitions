import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Easing,
  StatusBar,
  Button,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tutorial2Spec, width } from "../config/theme.js";
const { ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULLSIZE } = tutorial2Spec;
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

function TravelListDetails({ navigation, route }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name="arrowleft"
        size={24}
        style={{ padding: 12 }}
        color="#fff"
        onPress={navigation.goBack}
        style={{ paddingHorizontal: SPACING, top: 20, left: 10, zIndex: 2 }}
      />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View style={[StyleSheet.absoluteFillObject, { borderRadius: 10 }]}>
          <Image
            source={{ uri: item.image }}
            style={[StyleSheet.absoluteFillObject, { resizeMode: "cover" }]}
          />
        </View>
      </SharedElement>
      <SharedElement id={`item.${item.key}.location`}>
        <Text style={[styles.locations]}>{item.location}</Text>
      </SharedElement>
      <View style={{ position: "absolute", bottom: 120 }}>
        <Text
          style={{
            fontSize: 16,
            width: "100%",
            textTransform: "uppercase",
            fontWeight: "800",
            color: "#fff",
            marginHorizontal: SPACING,
          }}
        >
          Activities
        </Text>
        <FlatList
          data={[...Array(8).keys()]}
          keyExtractor={(item) => String(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: SPACING }}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View
                duration={700}
                animation={zoomIn}
                delay={400 + index * 100}
                style={{
                  backgroundColor: "#fff",
                  padding: SPACING,
                  width: width * 0.33,
                  height: width * 0.5,
                  marginRight: SPACING,
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://miro.medium.com/max/124/1*qYUvh-EtES8dtgKiBRiLsA.png",
                  }}
                  style={{ width: "100%", height: "70%", resizeMode: "cover" }}
                />
                <Text>Activity #{item + 1}</Text>
              </Animatable.View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

TravelListDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    { id: `item.${item.key}.photo` },
    { id: `item.${item.key}.location` },
  ];
};
export default TravelListDetails;

const styles = StyleSheet.create({
  locations: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: 100,
    left: SPACING * 2,
  },
});
