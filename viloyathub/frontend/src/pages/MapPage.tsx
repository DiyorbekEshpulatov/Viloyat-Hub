// frontend/src/pages/MapPage.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import { api } from '../lib/api';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPoint {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  working_hours: any;
  rating: number;
}

const pointIcons: Record<string, L.Icon> = {
  incubator: new L.Icon({ iconUrl: '/icons/incubator.png', iconSize: [32, 32] }),
  bank: new L.Icon({ iconUrl: '/icons/bank.png', iconSize: [32, 32] }),
  training: new L.Icon({ iconUrl: '/icons/training.png', iconSize: [32, 32] }),
  coworking: new L.Icon({ iconUrl: '/icons/coworking.png', iconSize: [32, 32] }),
  default: new L.Icon({ iconUrl: '/icons/default.png', iconSize: [32, 32] }),
};

export const MapPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [center, setCenter] = useState<[number, number]>([41.2995, 69.2401]); // Tashkent
  const [zoom, setZoom] = useState(7);
  
  const { data: points, isLoading } = useQuery({
    queryKey: ['map-points', selectedType],
    queryFn: () => api.getMapPoints(selectedType),
  });
  
  const { data: userLocation } = useQuery({
    queryKey: ['user-location'],
    queryFn: () => api.getUserLocation(),
  });
  
  useEffect(() => {
    if (userLocation) {
      setCenter([userLocation.lat, userLocation.lng]);
      setZoom(10);
    }
  }, [userLocation]);
  
  const getIcon = (type: string) => {
    return pointIcons[type] || pointIcons.default;
  };
  
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      incubator: 'Inkubatsiya markazi',
      bank: 'Bank',
      training: 'Trening markazi',
      coworking: 'Kovirking markazi',
    };
    return labels[type] || type;
  };
  
  return (
    <div className="map-page flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hududiy Xarita
          </h1>
          <p className="text-gray-600">
            Viloyatingizdagi tadbirkorlik resurslari va imkoniyatlar
          </p>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Filters Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto p-4">
          <h3 className="font-semibold mb-3">Filtrlash</h3>
          
          <div className="space-y-2 mb-6">
            <button
              onClick={() => setSelectedType('all')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedType === 'all'
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              📍 Barcha
            </button>
            <button
              onClick={() => setSelectedType('incubator')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedType === 'incubator'
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              🏭 Inkubatsiya markazlari
            </button>
            <button
              onClick={() => setSelectedType('bank')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedType === 'bank'
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              🏦 Banklar
            </button>
            <button
              onClick={() => setSelectedType('training')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedType === 'training'
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              📚 Trening markazlari
            </button>
            <button
              onClick={() => setSelectedType('coworking')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedType === 'coworking'
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              💻 Kovirking markazlari
            </button>
          </div>
          
          {/* Stats */}
          {points && (
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Statistika</h3>
              <div className="space-y-1 text-sm">
                <p>📍 Jami nuqtalar: {points.length}</p>
                <p>🏭 Inkubatsiya: {points.filter((p: MapPoint) => p.type === 'incubator').length}</p>
                <p>🏦 Banklar: {points.filter((p: MapPoint) => p.type === 'bank').length}</p>
                <p>📚 Trening: {points.filter((p: MapPoint) => p.type === 'training').length}</p>
                <p>💻 Kovirking: {points.filter((p: MapPoint) => p.type === 'coworking').length}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Map */}
        <div className="flex-1 relative">
          {!isLoading && (
            <MapContainer
              center={center}
              zoom={zoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {points?.map((point: MapPoint) => (
                <Marker
                  key={point.id}
                  position={[point.lat, point.lng]}
                  icon={getIcon(point.type)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900">{point.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{getTypeLabel(point.type)}</p>
                      <p className="text-sm text-gray-500 mt-1">{point.address}</p>
                      {point.phone && (
                        <p className="text-sm text-gray-500 mt-1">📞 {point.phone}</p>
                      )}
                      {point.working_hours && (
                        <p className="text-sm text-gray-500 mt-1">
                          🕐 {point.working_hours.weekdays}
                        </p>
                      )}
                      {point.rating > 0 && (
                        <p className="text-sm text-yellow-500 mt-1">
                          ⭐ {point.rating}/5
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};