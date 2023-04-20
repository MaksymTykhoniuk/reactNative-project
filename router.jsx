import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import PostScreen from "./Screens/mainScreen/PostScreen";
import CreateScreen from "./Screens/mainScreen/CreateScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "#212121",
        },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          title: "Публикации",

          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="layers-outline" size={24} color="#212121" />
          ),
        }}
        name="Post"
        component={PostScreen}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="md-add-outline" size={32} color="#FFF" />
          ),
          tabBarItemStyle: {
            backgroundColor: "#FF6C00",
            borderRadius: 100,
            marginHorizontal: 30,
            marginVertical: 5,
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="person-outline" size={24} color="#212121" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
