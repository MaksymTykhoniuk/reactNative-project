import React from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./router";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import firebase from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);
  firebase.auth().onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>{routing}</NavigationContainer>
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}
