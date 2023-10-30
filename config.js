import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH5JeVcXy7HyX9vE9oLj7NKvwxIaytPKQ",
  authDomain: "fastalk-11ef1.firebaseapp.com",
  projectId: "fastalk-11ef1",
  storageBucket: "fastalk-11ef1.appspot.com",
  messagingSenderId: "10790649069",
  appId: "1:10790649069:web:460626e8f5449b7f3860e4"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

// Pai Nosso que estais nos Céus, 
// santificado seja o vosso Nome, 
// venha a nós o vosso Reino, 
// seja feita a vossa vontade 
// assim na terra como no Céu. 
// O pão nosso de cada dia nos dai hoje, 
// perdoai-nos as nossas ofensas 
// assim como nós perdoamos 
// a quem nos tem ofendido, 
// e não nos deixeis cair em tentação, 
// mas livrai-nos do Mal.
// Amém.