import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Easing,
  StatusBar,
  Button,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NavigationList({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Navigation List</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <TouchableOpacity onPress={() => navigation.push("Lists")}>
          <View style={{ height: 31, width: 150 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              👉 Tutorial #1
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("TravelList")}>
          <View style={{ height: 31, width: 150 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              👉 Tutorial #2
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
