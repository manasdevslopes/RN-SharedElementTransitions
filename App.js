import React from "react";
import { StyleSheet, Text, View, Easing, StatusBar } from "react-native";

import Lists from "./screens/Lists.js";
import TravelList from "./screens/TravelList.js";
import Details from "./screens/Details.js";
import NavigationList from "./screens/NavigationList.js";
import TravelListDetails from "./screens/TravelListDetails.js";
import pages from "./config/pages.js";

import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";

enableScreens();

const stack = createSharedElementStackNavigator();
const options = () => ({
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 500, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 500, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
});
export default function App() {
  React.useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="NavigationList"
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}
      >
        <stack.Screen name="NavigationList" component={NavigationList} />
        <stack.Screen name="Lists" component={Lists} headerMode="screen" />
        <stack.Screen
          name="TravelList"
          component={TravelList}
          headerMode="screen"
        />

        <stack.Screen name="Details" component={Details} options={options} />
        <stack.Screen
          name="TravelListDetails"
          component={TravelListDetails}
          options={options}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
