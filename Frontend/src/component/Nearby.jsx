import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../assets/images/plus.png";

// Fix Leaflet marker icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const OverpassAPI = "https://overpass-api.de/api/interpreter";

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function NearbyMap() {
    const [position, setPosition] = useState([51.505, -0.09]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
                fetchPlaces(latitude, longitude);
            },
            // eslint-disable-next-line no-unused-vars
            (err) => {
                setError("Unable to retrieve your location.");
                setLoading(false);
            }
        );
    }, []);

    const fetchPlaces = async (lat, lon) => {
        setLoading(true);
        setError(null);
        const query = `
[out:json];
(
  node["amenity"="hospital"](around:2000,${lat},${lon});
  node["healthcare"="dermatology"](around:2000,${lat},${lon});
);
out body;
`;
        try {
            const response = await fetch(OverpassAPI, {
                method: "POST",
                body: query,
            });
            const data = await response.json();
            setPlaces(data.elements);
        } catch (err) {
            console.error("Error fetching places:", err);
            setError("Failed to fetch nearby places.");
        } finally {
            setLoading(false);
        }
    };

    const filteredPlaces = places.filter((place) => {
        if (filter === "all") return true;
        if (filter === "hospital" && place.tags.amenity === "hospital") return true;
        if (filter === "dermatology" && place.tags.healthcare === "dermatology") return true;
        return false;
    });

    return (
        <div className="flex flex-col md:flex-row w-full h-auto p-4 space-y-4 md:space-y-0 md:space-x-4">
            {/* Info Panel */}
            <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow overflow-y-auto max-h-[300px]">
                <h2 className="text-xl font-bold mb-4 text-blue-700">Nearby Hospitals & Dermatologists</h2>
                <div className="mb-4 flex space-x-2">
                    {["all", "hospital", "dermatology"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1 rounded text-sm ${
                                filter === type ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
                            } hover:bg-blue-500 hover:text-white transition`}
                        >
                            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <p className="text-gray-600 text-sm">Loading nearby locations...</p>
                ) : error ? (
                    <p className="text-red-500 text-sm">{error}</p>
                ) : filteredPlaces.length === 0 ? (
                    <p className="text-gray-600 text-sm">No nearby places found.</p>
                ) : (
                    <ul className="space-y-2">
                        {filteredPlaces.map((place) => (
                            <li key={place.id} className="p-3 bg-white rounded shadow hover:shadow-md transition text-sm">
                                <h4 className="font-semibold">{place.tags.name || "Unnamed Place"}</h4>
                                <p className="text-gray-500">
                                    {place.tags.amenity === "hospital" && "Hospital"}
                                    {place.tags.healthcare === "dermatology" && "Dermatologist"}
                                </p>
                                <p className="text-gray-400 text-xs">
                                    Lat: {place.lat.toFixed(4)}, Lon: {place.lon.toFixed(4)}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Map Panel */}
            <div className="w-full md:w-2/3 rounded-lg shadow overflow-hidden h-[300px] md:h-[350px]">
                <MapContainer center={position} zoom={14} className="w-full h-full">
                    <ChangeView center={position} zoom={14} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>You are here</Popup>
                    </Marker>
                    {filteredPlaces.map((place) => (
                        <Marker
                            key={place.id}
                            position={[place.lat, place.lon]}
                            icon={new L.Icon({
                                iconUrl: icon,
                                iconSize: [30, 30],
                            })}
                        >
                            <Popup>
                                <div>
                                    <h4 className="font-bold text-sm">{place.tags.name || "Unnamed Place"}</h4>
                                    <p className="text-xs text-gray-600">
                                        {place.tags.amenity === "hospital" && "Hospital"}
                                        {place.tags.healthcare === "dermatology" && "Dermatologist"}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
