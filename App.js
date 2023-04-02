import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import Main from "./Screens/components/Main";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Main />
        <StatusBar style="auto" />
      </Provider>
    </>
  );
}
