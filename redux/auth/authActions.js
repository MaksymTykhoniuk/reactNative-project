import firebase from "../../firebase/config";

const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(error.massage);
    }
  };
const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(error.massage);
    }
  };

const authSignOut = () => async (dispatch, getState) => {};

export { authSignIn, authSignOut, authSignUp };
