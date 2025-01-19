import { db } from "../config/firebaseConfig"; // Adjust the path to where your Firebase configuration is
import { collection, addDoc } from "firebase/firestore";

export const createUser = async (user) => { 
  try {
    // Reference a collection named 'users' (you can replace 'users' with your desired collection name)
    const docRef = await addDoc(collection(db, "users"), user);

    // Return the user object along with the newly created document ID
    return { id: docRef.id, ...user };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};
