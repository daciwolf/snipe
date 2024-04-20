"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Leaderboard from './Leaderboard';
import Alerts from './Alerts';


const loader = new Loader({
  apiKey: "AIzaSyAyIr3ZBmZUMAi9kZML91y3JlLc8sFYmPw",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: { lat: 34.0699, lng: -118.4438 },
  zoom: 16,
};

const landmarks = {
  bruinStatue: {
    center: { lat: 34.0720, lng: -118.4450 },
  },
};

function MapDisplay() {
  const mapContainerRef = useRef(null);

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
    
  // needs to take a landmark as a parameter
  useEffect(() => {
    loader.load().then(() => {
      if (mapContainerRef.current) {
        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        for (const city in landmarks) {
          new google.maps.Circle({
            strokeColor: "#1450db",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#6080b8",
            fillOpacity: 0.35,
            map: map,
            
            center: {
                lat: landmarks[city].center.lat + getRandomArbitrary(-0.0008, 0.0008),
                lng: landmarks[city].center.lng + getRandomArbitrary(-0.0008, 0.0008)
              },
            radius: 200,
          });
        }
      }
    });
  }, []);

  return (
    <div className="relative h-screen"> 
      <div className="w-full h-full border z-0" ref={mapContainerRef}>
        {/* Google Map occupies full container */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex p-2 z-10">
        <Alerts/>
        <Leaderboard/>
      </div>
    </div>
  );
}

export default MapDisplay;
