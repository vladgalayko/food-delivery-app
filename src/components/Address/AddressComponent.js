import React, { useState, useRef, useEffect } from 'react';
import './AddressComponent.css';

const AddressComponent = ({ onAddressChange, address, setAddress }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    loadMap();
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    onAddressChange(e.target.value);
    updateMarkerPosition(e.target.value);
  };

  const loadMap = () => {
    const google = window.google;
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 49.8397, lng: 24.0297 },
      zoom: 12,
    });
    markerRef.current = new google.maps.Marker({
      map,
      position: { lat: 49.8397, lng: 24.0297 },
    });
  };

  const updateMarkerPosition = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        markerRef.current.setPosition(location);
      } else {
        markerRef.current.setPosition(null);
      }
    });
  };

  return (
    <div className="address-component">
      <label>Address:</label>
      <input
        type="text"
        className="address-input"
        placeholder="Enter your address"
        value={address}
        onChange={handleAddressChange}
      />
      <div className="map-container" ref={mapRef}></div>
    </div>
  );
};

export default AddressComponent;