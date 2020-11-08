import firebase from  'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBT7p5OVlv99al8ekN7xjM8_JiHTGwSVqc",
    authDomain: "story-hub-5308d.firebaseapp.com",
    databaseURL: "https://story-hub-5308d.firebaseio.com",
    projectId: "story-hub-5308d",
    storageBucket: "story-hub-5308d.appspot.com",
    messagingSenderId: "650064917308",
    appId: "1:650064917308:web:fee5db4f63e58f4edca439"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore;