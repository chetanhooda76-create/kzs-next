"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Loader2, Search } from 'lucide-react';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const PRESETS = [
  { name: 'Delhi', coords: [28.6139, 77.2090] },
  { name: 'Noida', coords: [28.5741, 77.3565] },
  { name: 'Greater Noida', coords: [28.4744, 77.5030] },
  { name: 'Gurgaon', coords: [28.4595, 77.0266] },
  { name: 'Ghaziabad', coords: [28.6692, 77.4538] },
];

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapModal = ({ isOpen, onClose, onConfirm }) => {
  const [position, setPosition] = useState(new L.LatLng(28.6139, 77.2090)); // Default to Delhi
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    let isMounted = true;

    const delayDebounceFn = setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=in`
        );
        const data = await response.json();
        if (isMounted) {
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Geocoding search error:", error);
      } finally {
        if (isMounted) {
          setSearching(false);
        }
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery]);

   useEffect(() => {
    if (!position) return;

    let isMounted = true;

    const fetchAddress = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`);
        const data = await response.json();
        if (!isMounted) return;
        if (data.display_name) {
          setAddress(data.display_name);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Geocoding error:", error);
        setAddress('Unable to fetch address details');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAddress();

    return () => {
      isMounted = false;
    };
  }, [position]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 font-outfit uppercase tracking-tighter">Confirm Location</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pinpoint your cleanup spot</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">✕</button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3.5 border-b border-gray-100 bg-white relative z-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for your address or locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none font-bold text-xs text-gray-800 placeholder-gray-400 font-outfit transition-all duration-200"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            {(searchQuery || searching) && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searching && <Loader2 size={14} className="animate-spin text-gray-400" />}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute left-6 right-6 top-[calc(100%-2px)] bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[2000] divide-y divide-gray-50 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.place_id}
                  type="button"
                  onClick={() => {
                    const lat = parseFloat(suggestion.lat);
                    const lon = parseFloat(suggestion.lon);
                    const newPos = new L.LatLng(lat, lon);
                    setPosition(newPos);
                    setMapCenter([lat, lon]);
                    setAddress(suggestion.display_name);
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-2.5"
                >
                  <MapPin className="text-gray-400 shrink-0 mt-0.5" size={14} />
                  <span className="text-[11px] font-bold text-gray-600 line-clamp-2 leading-relaxed font-outfit">
                    {suggestion.display_name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Selection Presets */}
        <div className="px-6 py-3.5 border-b border-gray-100 bg-white flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 font-outfit">Select City:</span>
          {PRESETS.map((city) => {
            const isActive = Math.abs(position.lat - city.coords[0]) < 0.001 &&
                             Math.abs(position.lng - city.coords[1]) < 0.001;
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => {
                  const newPos = new L.LatLng(city.coords[0], city.coords[1]);
                  setPosition(newPos);
                  setMapCenter(city.coords);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-outfit transition-all duration-200 border ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>

        <div className="h-100 relative z-10">
          <MapContainer center={[28.6139, 77.2090]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <ChangeView center={mapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 w-full px-6">
            <div className="bg-white/95 backdrop-blur-md p-5 rounded-4xl shadow-2xl border border-gray-100 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">DETECTED ADDRESS</p>
                {loading ? (
                  <div className="flex items-center gap-2 py-1">
                    <Loader2 size={14} className="animate-spin text-gray-400" />
                    <span className="text-xs font-bold text-gray-400">Searching details...</span>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-gray-700 leading-relaxed line-clamp-2">
                    {address || 'Click anywhere on the map to pinpoint'}
                  </p>
                )}
              </div>
              <button 
                onClick={() => position && onConfirm(position.lat, position.lng)}
                className="w-full btn-primary py-4 text-sm font-black shadow-primary/20 uppercase tracking-widest"
              >
                CONFIRM THIS LOCATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
