import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";
require("firebase/auth");

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBGl7KNYKd1D2DRU5wlEa5-PIBZNjGL-fI",
    authDomain: "doing-nothing-firebase.firebaseapp.com",
    projectId: "doing-nothing-firebase",
    storageBucket: "doing-nothing-firebase.appspot.com",
    messagingSenderId: "54813910745",
    appId: "1:54813910745:web:20e5d922ad75133ba240c8",
    measurementId: "G-LRPZ39MSNL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics(); 

  export default firebase