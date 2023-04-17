import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: "",
  stateChange: false,
  // location: {
  //   longitude: 0,
  //   latitude: 0,
  // },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,

    // locationChange: (state, { payload }) => ({
    //   ...state,
    //   location: {
    //     longitude: payload.longitude,
    //     latitude: payload.latitude,
    //   },
    // }),
  },
});

console.log(authSlice);
