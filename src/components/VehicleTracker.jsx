import { useEffect } from 'react';

export default function VehicleTracker({ routeCoords, setPosition, setAngle }) {
  useEffect(() => {
    if (routeCoords.length < 2) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i + 1 >= routeCoords.length) {
        clearInterval(interval);
        return;
      }

      const curr = routeCoords[i];
      const next = routeCoords[i + 1];
      const bearing = calculateBearing(curr[0], curr[1], next[0], next[1]);

      setAngle(bearing);
      setPosition(next);
      i++;
    }, 200);

    return () => clearInterval(interval);
  }, [routeCoords]);

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