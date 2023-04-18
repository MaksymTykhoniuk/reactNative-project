import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreen/DefaultScreen";
import MapScreen from "../nestedScreen/MapScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostScreen = () => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "#212121",
        },
      }}
    >
      <NestedScreen.Screen
        options={{
          headerShown: false,
        }}
        name="DefaultScreen"
        component={DefaultScreen}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostScreen;
