import React, { useEffect, useRef, useState } from "react";

function TripsWebSocket() {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUrl = `${protocol}://${window.location.host}/ws/trips/`;

  const ws = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  const connect = () => {
    setConnectionStatus("Connecting...");
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setConnectionStatus("Connected");
      setRetryCount(0);
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from server:", data);

      if (data.type === "trip_created") {
        alert(`Trip created! Estimated fare: ${data.estimated_fare}`);
      } else if (data.type === "error") {
        alert(`Error: ${data.message}`);
      }
    };

    ws.current.onclose = (event) => {
      setConnectionStatus("Disconnected");
      console.log(`WebSocket closed: code=${event.code} reason=${event.reason}`);

      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          connect();
        }, RETRY_DELAY);
      } else {
        console.error("Max retry attempts reached. Could not connect.");
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current.close();
    };
  };

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const createTrip = (tripData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          action: "create_trip",
          ...tripData,
        })
      );
    } else {
      alert("WebSocket not connected. Try again later.");
    }
  };

  const handleCreateTrip = () => {
    const exampleTripData = {
      vehicle_type: "sedan",
      pickup: "Point A",
      destination: "Point B",
      pickup_latitude: 12.34,
      pickup_longitude: 56.78,
      dest_latitude: 23.45,
      dest_longitude: 67.89,
      load_description: "Small package",
    };
    createTrip(exampleTripData);
  };

  // Basic styling
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: 400,
      margin: "50px auto",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
      textAlign: "center",
    },
    status: {
      marginBottom: 20,
      fontWeight: "bold",
      fontSize: 18,
      color:
        connectionStatus === "Connected"
          ? "green"
          : connectionStatus === "Connecting..."
          ? "orange"
          : "red",
    },
    retry: {
      marginBottom: 20,
      color: "#666",
      fontSize: 14,
    },
    button: {
      padding: "10px 20px",
      fontSize: 16,
      borderRadius: 5,
      border: "none",
      cursor: connectionStatus === "Connected" ? "pointer" : "not-allowed",
      backgroundColor: connectionStatus === "Connected" ? "#007bff" : "#bbb",
      color: "white",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.status}>WebSocket status: {connectionStatus}</p>
      <p style={styles.retry}>Retry attempts: {retryCount}</p>
      <button
        style={styles.button}
        onClick={handleCreateTrip}
        disabled={connectionStatus !== "Connected"}
      >
        Create Trip
      </button>
    </div>
  );
}

export default TripsWebSocket;
