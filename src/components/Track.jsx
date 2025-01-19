import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMessaging from "../hooks/useMessaging";
import SaveBiteMap from "./SaveBiteMap";

const Track = ({ user }) => {
  const { connect, subscribe, sendMessage, messages, connection } =
    useMessaging(user);
  const { orderId } = useParams();
  // const navigate = useNavigate()

  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    if (!messages[0]) {
      // mark order as complete
      // show order has been 
      return;
    }
    const updatedLocation = JSON.parse(messages[0].payload);
    setLocation(updatedLocation);
  }, [messages]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          setLocation({ lat: 45.419518, lon: -75.630251 });
        },
        (err) => {
          console.error("Error getting location:", err);
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array ensures this runs on page load

  useEffect(() => {
    connect()
      .then(() => {
        subscribe(`orders/track/${orderId}`);
      })
      .catch((err) => console.error("Failed to connect or subscribe:", err));
  }, [connect, subscribe, orderId]);

  // const publish = () => {
  //   sendMessage(`orders/track/${orderId}`, {
  //     latitude: 45.4215,
  //     longitude: -75.6972,
  //   });
  // };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Real-Time Tracking</h1>
      <p>Status: {connection.isConnected ? "Connected" : "Disconnected"}</p>

      {/* <button className="underline" onClick={publish}>
        Send Test Message
      </button> */}
      {location && (
        <SaveBiteMap location={location} userLocation={userLocation} />
      )}
    </div>
  );
};

export default Track;
