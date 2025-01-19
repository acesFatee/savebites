import axios from "axios";

export const startTracking = async (orderId) => {
  try {
    const response = await axios.post(`http://localhost:9001/publish/${orderId}`, {
      endLat: "45.42279012312327",
      endLon: "-75.68364447683525",
      startLat: "45.419518", // here I will put the food bank's coordinates
      startLon: "-75.630251",
    });

    console.log(response.data); // Axios response data
    return response.data; // Return the result
  } catch (error) {
    console.error("Error starting tracking:", error.message);
    throw error; // Re-throw the error to let the caller handle it
  }
};
