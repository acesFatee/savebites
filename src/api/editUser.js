import { doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";


export const edituser = async (userId, newRestaurantName) => {
    try {
      // Reference to the user's document in Firestore
      const userRef = doc(db, "users", userId);
  
      // Update only the restaurant name field
      await updateDoc(userRef, {
        restaurantName: newRestaurantName,
      });
  
      console.log("Restaurant name updated successfully!");
    } catch (error) {
      console.error("Error updating restaurant name:", error);
    }
  };