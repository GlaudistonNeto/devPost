import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

let firebaseConfig = {
  apiKey: "AIzaSyBL7X43k503wq_tSIzHhxnE5ZPWozoTl1E",
  authDomain: "whatsappclone-a31d0.firebaseapp.com",
  databaseURL: "https://whatsappclone-a31d0.firebaseio.com",
  projectId: "whatsappclone-a31d0",
  storageBucket: "whatsappclone-a31d0.appspot.com",
  messagingSenderId: "158248051194",
  appId: "1:158248051194:web:5e74b4bdd4600c24c18443"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
