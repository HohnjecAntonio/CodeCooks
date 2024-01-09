// firebase.js
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyAqrrA2qPZIV3yqO7JbTHdveoXPNY53VIc",
  authDomain: "testing-6cb68.firebaseapp.com",
  databaseURL: 'https://testing-6cb68-default-rtdb.europe-west1.firebasedatabase.app', // Update this line
  projectId: "testing-6cb68",
  storageBucket: "testing-6cb68.appspot.com",
  messagingSenderId: "947668955879",
  appId: "1:947668955879:web:5ea6593eafadf45816e842",
  measurementId: "G-8RE96Q41BG"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;