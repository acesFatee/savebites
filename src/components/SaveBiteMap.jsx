import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../App.css";

function SaveBiteMap({ location, userLocation }) {
  const mapRef = useRef(); // Reference to the map object
  const mapContainerRef = useRef(); // Reference to the map container div
  const locationMarkerRef = useRef(); // Reference to the location marker
  const userLocationMarkerRef = useRef(); // Reference to the user location marker

  useEffect(() => {
    // Set your Mapbox access token
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWNlc2ZhdGUiLCJhIjoiY202MzV3MXA2MTQ0MjJtbzZ5MHhtcGR0ZCJ9.oy7ZM6rje9syqFROeNBF4A";

    // Initialize the Mapbox map (only once)
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // Reference to the HTML container
      style: "mapbox://styles/mapbox/streets-v11", // Map style (streets-v11 as default)
      center: [location?.lon || 0, location?.lat || 0], // Default center
      zoom: 12, // Initial zoom level
    });

    // Add initial markers
    locationMarkerRef.current = new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([location?.lon || 0, location?.lat || 0])
      .addTo(mapRef.current);

    userLocationMarkerRef.current = new mapboxgl.Marker({ color: "blue", rotation: 45 })
      .setLngLat([userLocation?.lon || 0, userLocation?.lat || 0])
      .addTo(mapRef.current);

    // Cleanup function
    return () => {
      mapRef.current.remove();
    };
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Update location marker
    if (locationMarkerRef.current && location?.lon != null && location?.lat != null) {
      locationMarkerRef.current.setLngLat([location.lon, location.lat]);
    }
  }, [location]);

  useEffect(() => {
    // Update user location marker
    if (userLocationMarkerRef.current && userLocation?.lon != null && userLocation?.lat != null) {
      userLocationMarkerRef.current.setLngLat([userLocation.lon, userLocation.lat]);
    }
  }, [userLocation]);

  return (
    <>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }} // Set map container size
      />
    </>
  );
}

export default SaveBiteMap;
