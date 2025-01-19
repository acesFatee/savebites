import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useMessaging from "../hooks/useMessaging";
import SaveBiteMap from "./SaveBiteMap";

const Track = ({ user }) => {
  const { connect, subscribe, messages, connection } = useMessaging(user);
  const { orderId } = useParams();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation] = useState({
    lat: 45.42279012312327,
    lon: -75.68364447683525,
  });

  // Memoized function to subscribe to the topic
  const subscribeToTopic = useCallback(async () => {
    try {
      await connect();
      subscribe(`orders/track/${orderId}`);
    } catch (err) {
      console.error("Failed to connect or subscribe:", err);
    }
  }, [connect, subscribe, orderId]);

  useEffect(() => {
    subscribeToTopic();
  }, [subscribeToTopic]);

  useEffect(() => {
    if (messages.length === 0) {
      setLocation(null);
      setLoading(false);
      return;
    }

    try {
      const updatedLocation = JSON.parse(messages[0].payload);
      setLocation(updatedLocation);
    } catch (error) {
      console.error("Error parsing location message:", error);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Real-Time Tracking</h1>
      <p>Status: {connection.isConnected ? "Connected" : "Disconnected"}</p>

      {loading ? (
        <p>Loading...</p>
      ) : location ? (
        <SaveBiteMap location={location} userLocation={userLocation} />
      ) : (
        <p>Order has been picked up by the rider</p>
      )}
    </div>
  );
};

export default Track;
