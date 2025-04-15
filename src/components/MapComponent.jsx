import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const vehicleIcon = (angle) =>
  new L.DivIcon({
    className: 'vehicle-icon',
    html: `<img src="/car.png" style="width: 32px; transform: rotate(${angle}deg);" />`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

function MapWrapper({ setMapRef }) {
  const map = useMap();
  useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);
  return null;
}

export default function MapComponent({
  route,
  currentPosition,
  angle,
  setMapRef,
  showPopup,
  onMarkerClick,
  address,
}) {
  return (
    <MapContainer center={currentPosition} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {route.length > 0 && <Polyline positions={route} color="blue" weight={4} />}
      <Marker position={currentPosition} icon={vehicleIcon(angle)} eventHandlers={{ click: onMarkerClick }}>
        {showPopup && (
          <Popup>
            <div>
              <p><strong>Current Location:</strong></p>
              <p>Lat: {currentPosition[0].toFixed(5)}</p>
              <p>Lng: {currentPosition[1].toFixed(5)}</p>
              <p className="mt-2 text-sm text-gray-700"><strong>Address:</strong> {address}</p>
            </div>
          </Popup>
        )}
      </Marker>
      <MapWrapper setMapRef={setMapRef} />
    </MapContainer>
  );
}