import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const createOrder = async (orderData) => {
    try {
        // Reference to the "orders" collection in Firestore
        const ordersCollection = collection(db, "orders");

        // Add the order document to Firestore
        const docRef = await addDoc(ordersCollection, orderData);

        console.log("Order created successfully with ID:",  docRef.id);

        // Return the created order ID
        return docRef.id;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Re-throw the error for further handling
    }
};
