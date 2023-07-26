import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Initialize Firebase with your configuration
export const  auth= firebase.initializeApp({
  apiKey: "AIzaSyAz_WIpncbBH8-kwPTheCWbuKx0YdDGJw8",
  authDomain: "unichat-505bf.firebaseapp.com",
  projectId: "unichat-505bf",
  storageBucket: "unichat-505bf.appspot.com",
  messagingSenderId: "717548927724",
  appId: "1:717548927724:web:ac2185b522f331251c03c9"
}).auth();

