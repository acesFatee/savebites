import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const getUser = async (email) => {
    try {
        // Create a query to find the user document with the matching email
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("email", "==", email));

        // Execute the query
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming email is unique, return the first matching document's data
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() }; // Include the document ID
        } else {
            console.log("No user found with the provided email!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
};
