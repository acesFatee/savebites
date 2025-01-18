import { db } from "../config/firebaseConfig"; // Adjust the path to where your Firebase configuration is
import { collection, addDoc } from "firebase/firestore";

export const createUser = async (user) => { 
  try {
    // Reference a collection named 'users' (you can replace 'users' with your desired collection name)
    const docRef = await addDoc(collection(db, "users"), user);

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
