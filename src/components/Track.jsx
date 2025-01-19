import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMessaging from "../hooks/useMessaging";

const Track = ({ user }) => {
  const { connect, subscribe, sendMessage, messages, connection } = useMessaging(user);
  const { orderId } = useParams();

  useEffect(() => {
    connect()
      .then(() => {
        subscribe(`orders/track/${orderId}`);
        console.log(`Subscribed to orders/track/${orderId}`);
      })
      .catch((err) => console.error("Failed to connect or subscribe:", err));
  }, [connect, subscribe, orderId]);

  const publish = () => {
    sendMessage(`orders/track/${orderId}`, {
      latitude: 45.4215,
      longitude: -75.6972,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Real-Time Tracking</h1>
      <p>Status: {connection.isConnected ? "Connected" : "Disconnected"}</p>

      <button className="underline" onClick={publish}>
        Send Test Message
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Received Messages:</h2>
        <ul className="list-disc pl-6">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <li key={index}>
                <strong>Topic:</strong> {msg.topic} <br />
                <strong>Payload:</strong> {msg.payload}
              </li>
            ))
          ) : (
            <li>No messages received yet.</li>
          )}
        </ul>
      </div>
      
    </div>
  );
};

export default Track;
