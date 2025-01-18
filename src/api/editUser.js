import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const editUser = async (userId, newRestaurantName) => {
  try {
    // Reference to the user's document in Firestore
    const userRef = doc(db, "users", userId);

    // Update only the restaurant name field
    await updateDoc(userRef, {
      restaurantName: newRestaurantName,
    });

    // Fetch and return the updated user document
    const updatedDoc = await getDoc(userRef);
    if (updatedDoc.exists()) {
      return { id: updatedDoc.id, ...updatedDoc.data() }; // Include document ID
    } else {
      console.error("User document does not exist after update.");
      return null;
    }
  } catch (error) {
    console.error("Error updating restaurant name:", error);
    return null;
  }
};
