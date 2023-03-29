import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";

export default function App() {
  const routing = useRoute(null);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>{routing}</NavigationContainer>
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}
