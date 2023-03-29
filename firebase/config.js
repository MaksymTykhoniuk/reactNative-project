import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW-wSaG_9_sRq5eaVVtiWOPQ97CfPIVOw",
  authDomain: "reactnative-project-5e736.firebaseapp.com",
  projectId: "reactnative-project-5e736",
  storageBucket: "reactnative-project-5e736.appspot.com",
  messagingSenderId: "301167207968",
  appId: "1:301167207968:web:d57fb5f4df3264afcc7e45",
  measurementId: "G-48Z3WVBC72",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
