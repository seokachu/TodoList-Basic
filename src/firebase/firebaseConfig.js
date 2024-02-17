// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOY4iXeeKkZMSFiE03E8YSpppaxh9lDwE",
  authDomain: "sparta-basic-todos.firebaseapp.com",
  projectId: "sparta-basic-todos",
  storageBucket: "sparta-basic-todos.appspot.com",
  messagingSenderId: "479660491976",
  appId: "1:479660491976:web:8758b5399fb24947b311fd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
