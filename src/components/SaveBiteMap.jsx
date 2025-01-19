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
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location?.lon || 0, location?.lat || 0],
      zoom: 12,
    });

    // Add initial markers
    locationMarkerRef.current = new mapboxgl.Marker({
      color: "black",
      rotation: 45,
    })
      .setLngLat([location?.lon || 0, location?.lat || 0])
      .addTo(mapRef.current);

    userLocationMarkerRef.current = new mapboxgl.Marker({
      color: "blue",
      rotation: 45,
    })
      .setLngLat([userLocation?.lon || 0, userLocation?.lat || 0])
      .addTo(mapRef.current);

    // Cleanup function
    return () => {
      mapRef.current.remove();
    };
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Update location marker
    if (
      locationMarkerRef.current &&
      location?.lon != null &&
      location?.lat != null
    ) {
      locationMarkerRef.current.setLngLat([location.lon, location.lat]);
    }
  }, [location]);

  useEffect(() => {
    // Update user location marker
    if (
      userLocationMarkerRef.current &&
      userLocation?.lon != null &&
      userLocation?.lat != null
    ) {
      userLocationMarkerRef.current.setLngLat([
        userLocation.lon,
        userLocation.lat,
      ]);
    }
  }, [userLocation]);

  return (
    <>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      />
    </>
  );
}

export default SaveBiteMap;
