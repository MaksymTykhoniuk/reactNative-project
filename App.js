import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const routing = useRoute({});

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
