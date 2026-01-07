import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYd3aIqyfEc6usBeBD6jjKmRlzzKDTjZQ",
  authDomain: "morocco-2030-mobile.firebaseapp.com",
  projectId: "morocco-2030-mobile",
  storageBucket: "morocco-2030-mobile.appspot.com",
  messagingSenderId: "774690925546",
  appId: "1:774690925546:web:0dd2197f26fa9607eb6093",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
