import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCkkFyZaXprhZqnaBwWB4o89W8dnP8imys",
  authDomain: "json-manipulation.firebaseapp.com",
  databaseURL: "https://json-manipulation-default-rtdb.firebaseio.com",
  projectId: "json-manipulation",
  storageBucket: "json-manipulation.appspot.com",
  messagingSenderId: "639605502545",
  appId: "1:639605502545:web:81bfaa74efa0e88fb53e70",
  measurementId: "G-8G66MNV44E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
