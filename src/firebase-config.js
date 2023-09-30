import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCl9Wv5Nfu4xVmePp5L0L1ufkt3kPhF8iI",
  authDomain: "info-session-pass.firebaseapp.com",
  projectId: "info-session-pass",
  storageBucket: "info-session-pass.appspot.com",
  messagingSenderId: "140813066021",
  appId: "1:140813066021:web:6428eaa1294fc9768c04cc",
  measurementId: "G-F50JGJD5F4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore()