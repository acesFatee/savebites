import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Adjust the path based on your project structure

export const changeOrderStatus = async (orderId, status) => {
  try {
    // Reference to the order document in Firestore
    const orderRef = doc(db, "orders", orderId);

    // Update the order's status field
    await updateDoc(orderRef, {
      status: status,
    });

    // Fetch the updated order document
    const updatedOrderSnap = await getDoc(orderRef);

    if (updatedOrderSnap.exists()) {
      console.log("Order updated successfully:", updatedOrderSnap.data());
      return { id: updatedOrderSnap.id, ...updatedOrderSnap.data() }; // Return full order object
    } else {
      console.log("No such order found!");
      return null;
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
