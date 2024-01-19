// firebase.js
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyBws4gFgKuxGOsx8i9PW1DoHG86I-g3450",
  authDomain: "progi-6c687.firebaseapp.com",
  databaseURL: "https://progi-6c687-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "progi-6c687",
  storageBucket: "progi-6c687.appspot.com",
  messagingSenderId: "1006507850304",
  appId: "1:1006507850304:web:13b7913a2095f8910b7da5",
  measurementId: "G-FJW81D9HYW"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;