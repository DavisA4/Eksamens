// Map component
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ center, zoom, displayMarker, allowMarkerAddition, onMapClick }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add marker if displayMarker prop is true
      if (displayMarker) {
        addMarker(center);
      }
    } else {
      mapRef.current.setView(center, zoom);
    }

    const handleClick = (event) => {
      const { lat, lng } = event.latlng;

      if (!allowMarkerAddition) {
        return;
      }

      if (marker) {
        mapRef.current.removeLayer(marker);
      }

      addMarker([lat, lng]);

      if (onMapClick) {
        onMapClick({ lat, lng });
      }
    };

    mapRef.current.on("click", handleClick);

    return () => {
      mapRef.current.off("click", handleClick);
    };
  }, [center, zoom, displayMarker, allowMarkerAddition, onMapClick]);

  const addMarker = (position) => {
    const customIcon = new Icon({
      iconUrl: markerIconPng,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    const newMarker = L.marker(position, { icon: customIcon }).addTo(
      mapRef.current
    );
    setMarker(newMarker);
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default Map;
