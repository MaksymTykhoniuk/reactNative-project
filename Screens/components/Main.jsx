import React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";

import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authActions";

const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
