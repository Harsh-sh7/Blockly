import { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';
import RideSelector from './components/RideSelector';
import VehicleTracker from './components/VehicleTracker';
import dummyData from './data/dummyData.json';

const ORS_API_KEY = '5b3ce3597851110001cf6248f7a026b5d91442f682436eb4ac764104';
const DEFAULT_LOCATION = [28.6139, 77.2090];

export default function App() {
  const [routeCoords, setRouteCoords] = useState([]);
  const [position, setPosition] = useState(DEFAULT_LOCATION);
  const [angle, setAngle] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const fetchRoute = async (start, end) => {
    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
        { coordinates: [start, end] },
        {
          headers: {
            Authorization: ORS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      const coords = response.data.features[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );

      setRouteCoords(coords);
      setPosition(coords[0]);

      if (mapRef) {
        mapRef.flyTo(coords[0], 13);
      }
    } catch (err) {
      console.error("Failed to fetch route:", err);
    }
  };

  useEffect(() => {
    if (!selectedDate) return;
    const ride = dummyData.find((r) => r.date === selectedDate);
    if (ride) {
      fetchRoute(ride.start, ride.end);
    }
  }, [selectedDate]);

  return (
    <div className="relative h-screen w-screen">
      <MapComponent
        route={routeCoords}
        currentPosition={position}
        angle={angle}
        setMapRef={setMapRef}
      />

      <RideSelector
        dummyData={dummyData}
        onSelectDate={setSelectedDate}
      />

      <VehicleTracker
        routeCoords={routeCoords}
        setPosition={setPosition}
        setAngle={setAngle}
      />
    </div>
  );
}