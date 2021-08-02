import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCecFPONmApcb-mDxLKq_d6sMJ3S-F4yL4",
  authDomain: "json-manipulator.firebaseapp.com",
  projectId: "json-manipulator",
  storageBucket: "json-manipulator.appspot.com",
  messagingSenderId: "82320750519",
  appId: "1:82320750519:web:99f4913f170aec825fda32",
  measurementId: "G-R5B0T63E3N",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
