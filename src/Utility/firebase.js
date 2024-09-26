
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAnqXaxhE4ycqtVFsHJSWTcRId5KhcvFA",
  authDomain: "clone-6488e.firebaseapp.com",
  projectId: "clone-6488e",
  storageBucket: "clone-6488e.appspot.com",
  messagingSenderId: "809968721956",
  appId: "1:809968721956:web:2aa6ee6086c2ea5a8978b1",
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=app.firestore()
