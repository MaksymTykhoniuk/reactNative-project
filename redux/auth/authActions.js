import firebase from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      alert(error);
    }
  };
const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const user = firebase.auth().currentUser;

      await user.updateProfile({
        displayName: userName,
      });

      const { displayName, uid } = firebase.auth().currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error);
      alert(error.massage);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await firebase.auth().signOut();
  dispatch(authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export { authSignIn, authSignOutUser, authSignUp, authStateChangeUser };
