import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SLIDER_DATA } from "../config/travel.js";
import { ITEM_WIDTH, width, SPACING } from "../config/theme.js";

export default function MarketingSlider() {
  return (
    <FlatList
      data={SLIDER_DATA}
      keyExtractor={(item) => item.color}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: width - ITEM_WIDTH - SPACING * 2,
      }}
      decelerationRate="fast"
      renderItem={({ item }) => {
        return (
          <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    margin: SPACING,
  },
  itemText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
