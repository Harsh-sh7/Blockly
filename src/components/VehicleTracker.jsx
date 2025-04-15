import { useEffect, useRef } from 'react';

export default function VehicleTracker({
  routeCoords,
  setPosition,
  setAngle,
  indexRef,  // Receive indexRef
  play, // Assuming you have play state to control whether the vehicle moves
}) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!play || routeCoords.length < 2) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (indexRef.current + 1 >= routeCoords.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const curr = routeCoords[indexRef.current];
      const next = routeCoords[indexRef.current + 1];
      const bearing = calculateBearing(curr[0], curr[1], next[0], next[1]);

      setAngle(bearing);  // Update the angle
      setPosition(next);  // Update the position

      indexRef.current++;  // Increment the index
    }, 200);  // Set the interval time to control the animation speed

    return () => clearInterval(intervalRef.current); // Cleanup on component unmount
  }, [play, routeCoords]);

  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  };

  return null;
}