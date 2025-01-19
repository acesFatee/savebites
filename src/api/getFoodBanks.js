import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const getFoodBanks = async () => {
    try {
        // Reference the "foodBanks" collection
        const foodBanksCollection = collection(db, "foodBanks");

        // Execute the query to get all documents
        const querySnapshot = await getDocs(foodBanksCollection);

        if (!querySnapshot.empty) {
            // Map through each document and return an array of food bank data
            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } else {
            console.log("No food banks found!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching food banks:", error);
        return [];
    }
};
