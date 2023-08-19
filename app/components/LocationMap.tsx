"use client";

import leaflet from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// @ts-ignore
delete leaflet.Icon.Default.prototype._getIconUrl;

// Assign marker icons manually
leaflet.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface LocationMapProps {
    center?: number[];
}

const LocationMap: React.FC<LocationMapProps> = ({ center }) => {
    return (
        <MapContainer
            center={(center as leaflet.LatLngExpression) || [51, -0.09]}
            zoom={center ? 4.5 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {center && <Marker position={center as leaflet.LatLngExpression} />}
        </MapContainer>
    );
};

export default LocationMap;
