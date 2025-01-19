import axios from "axios";

export const startTracking = async (
  orderId,
  startLat,
  startLon,
  endLat,
  endLon
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_PUBLISH_URL}/${orderId}`,
      {
        startLat,
        startLon,
        endLat,
        endLon,
      }
    );

    console.log(response.data); // Axios response data
    return response.data; // Return the result
  } catch (error) {
    console.error("Error starting tracking:", error.message);
    throw error; // Re-throw the error to let the caller handle it
  }
};
