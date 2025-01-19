import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const createOrder = async (orderData) => {
    try {
        if (!orderData.foodBankId) {
            throw new Error("Food bank ID is required.");
        }

        // Reference to the food bank document in Firestore
        const foodBankRef = doc(db, "foodBanks", orderData.foodBankId);
        const foodBankSnap = await getDoc(foodBankRef);

        if (!foodBankSnap.exists()) {
            throw new Error("Food bank not found with the given ID.");
        }

        // Get food bank data and include it in the order
        const foodBankData = { id: foodBankSnap.id, ...foodBankSnap.data() };
 
        // Prepare the order with complete food bank details
        const completeOrderData = {
            ...orderData,
            foodBank: foodBankData,  // Store full food bank details
        };
        delete completeOrderData.foodBankId; // Remove ID as we now store full object

        // Reference to the "orders" collection in Firestore
        const ordersCollection = collection(db, "orders");

        // Add the order document to Firestore
        const docRef = await addDoc(ordersCollection, completeOrderData);
        // Return the created order with ID and data
        return { id: docRef.id, ...completeOrderData };
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Re-throw the error for further handling
    }
};
