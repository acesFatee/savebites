import { useState, useEffect, useCallback } from "react";
import Paho from "paho-mqtt";
import options from "../config/solaceConfig"; // Import your MQTT configuration

const useMessaging = (user) => {
  const [connection, setConnection] = useState({
    client: null,
    isConnected: false,
  });
  const [messages, setMessages] = useState([]);

  // Initialize the MQTT client
  useEffect(() => {
    const clientId = `client-${user.email}`;
    const mqttClient = new Paho.Client(
      options.invocationContext.host,
      Number(options.invocationContext.port),
      clientId
    );

    mqttClient.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.error("Connection lost:", responseObject.errorMessage);
        setConnection((prev) => ({ ...prev, isConnected: false }));
      }
    };

    mqttClient.onMessageArrived = (message) => {
      console.log("Message received:", message.payloadString);
      setMessages((prevMessages) => [
        { topic: message.destinationName, payload: message.payloadString },
        ...prevMessages,
      ]);
    };

    setConnection({ client: mqttClient, isConnected: false });

    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, [user.email]);

  // Connect to the MQTT broker
  const connect = useCallback(() => {
    if (!connection.client) return Promise.reject("MQTT client not initialized");

    if (connection.isConnected) {
      console.warn("Client is already connected");
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const connectionOptions = {
        ...options,
        onSuccess: () => {
          console.log("Connected to MQTT broker");
          setConnection((prev) => ({ ...prev, isConnected: true }));
          resolve();
        },
        onFailure: (error) => {
          console.error("Failed to connect:", error);
          setConnection((prev) => ({ ...prev, isConnected: false }));
          reject(error);
        },
      };

      connection.client.connect(connectionOptions);
    });
  }, [connection.client, connection.isConnected]);

  // Subscribe to a topic
  const subscribe = useCallback(
    (topic) => {
      if (!connection.client) {
        console.error("MQTT client not initialized");
        return;
      }

      if (!connection.isConnected) {
        console.error("Client is not connected. Cannot subscribe to topic.");
        return;
      }

      connection.client.subscribe(topic);
      console.log(`Subscribed to topic: ${topic}`);
    },
    [connection]
  );

  // Send a message to a topic
  const sendMessage = useCallback(
    (topic, message) => {
      if (!connection.client) {
        console.error("MQTT client not initialized");
        return;
      }

      if (!connection.isConnected) {
        console.error("Client is not connected. Cannot send message.");
        return;
      }

      const mqttMessage = new Paho.Message(JSON.stringify(message));
      mqttMessage.destinationName = topic;
      connection.client.send(mqttMessage);
      console.log(`Message sent to ${topic}:`, JSON.stringify(message));
    },
    [connection]
  );

  return {
    connect,
    subscribe,
    sendMessage,
    messages,
    connection,
  };
};

export default useMessaging;
