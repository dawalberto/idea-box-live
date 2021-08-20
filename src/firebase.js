import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4TJFOYToygEZyIDUxJue3GegGvVed6-4",
    authDomain: "ideaboxlive-9ea52.firebaseapp.com",
    projectId: "ideaboxlive-9ea52",
    storageBucket: "ideaboxlive-9ea52.appspot.com",
    messagingSenderId: "209727098708",
    appId: "1:209727098708:web:934d227170ab8483f942c1"
  };

  firebase.initializeApp(firebaseConfig);