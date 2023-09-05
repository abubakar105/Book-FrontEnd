import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig={
    apiKey: "AIzaSyDpgaiMFOtJupd28zLwp2beesyrCJkcgrk",
    authDomain: "book-9bfa1.firebaseapp.com",
    projectId: "book-9bfa1",
    storageBucket: "book-9bfa1.appspot.com",
    messagingSenderId: "868184122327",
    appId: "1:868184122327:web:5bc7bc9ccf755d9d4d2192",
    measurementId: "G-64YDD8GCRY"
};
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);