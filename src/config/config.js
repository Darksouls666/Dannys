import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdhRvo24hw3Kf4eNIlu1K8fWrBmT78xl0",
    authDomain: "dannys-dff29.firebaseapp.com",
    projectId: "dannys-dff29",
    storageBucket: "dannys-dff29.appspot.com",
    messagingSenderId: "837052207301",
    appId: "1:837052207301:web:f6b8922349afdd57c2a0ac",
    measurementId: "G-Z2EQ9F9M9H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, firebaseConfig };
