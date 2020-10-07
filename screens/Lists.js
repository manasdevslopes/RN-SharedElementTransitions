import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MarketingSlider from "../Components/MarketingSlider";
import { DATA } from "../config/travel.js";
import { ITEM_WIDTH, width, SPACING, ICON_SIZE } from "../config/theme.js";
import Icon from "../Components/Icon";
import { SharedElement } from "react-navigation-shared-element";

export default function Lists({ navigation }) {
  return (
    <SafeAreaView style={{}}>
      <MarketingSlider />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        {DATA.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{ padding: SPACING }}
              onPress={() => navigation.push("Details", { item })}
            >
              <SharedElement id={`item.${item.id}.icon`}>
                <Icon uri={item.imageUri} />
              </SharedElement>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[styles.itemContainer]}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            SHARED ELEMENT TRANSITION
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            + iOS App Development - SwiftUI
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            + REACT NATIVE
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>+ EXPO</Text>
          <Text>@manas.ios_developpeur</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text>iOS / React Native Developer</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "700" }}>Infosys Limited</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    margin: SPACING,
    backgroundColor: "yellow",
  },
});
