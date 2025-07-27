import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px' // Chiều cao của bản đồ
};

// Vị trí mặc định của cửa hàng của bạn (ví dụ: một địa điểm ở TP.HCM)
const defaultCenter = {
    lat: 10.762622,  // Vĩ độ của TP.HCM (hoặc vị trí cửa hàng của bạn)
    lng: 106.660172 // Kinh độ của TP.HCM (hoặc vị trí cửa hàng của bạn)
};

// Có thể có nhiều địa điểm cửa hàng
const locations = [
    {
        id: 1,
        name: 'Pizza Store - Quận 1',
        address: '123 Đường Nam Kỳ Khởi Nghĩa, P. Bến Nghé, Quận 1, TP.HCM',
        phone: '+84 28 1234 5678',
        lat: 10.776964,
        lng: 106.701174,
    },
    {
        id: 2,
        name: 'Pizza Store - Quận 7',
        address: '456 Đường Nguyễn Thị Thập, P. Tân Phong, Quận 7, TP.HCM',
        phone: '+84 28 9876 5432',
        lat: 10.729019,
        lng: 106.708892,
    },
    // Thêm các địa điểm khác nếu cần
];

function LocationPage() {
    // Lấy API Key từ biến môi trường
    // Đối với Vite, biến môi trường phải bắt đầu bằng VITE_
    // Đảm bảo bạn đã tạo file .env.local (hoặc .env) trong thư mục gốc frontend
    // Ví dụ: VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        // libraries: ['places'], // uncomment nếu bạn cần Places API
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        // Có thể zoom map đến mức bạn muốn khi tải xong
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(loc => bounds.extend({lat: loc.lat, lng: loc.lng}));
        map.fitBounds(bounds); // Fit bản đồ để hiển thị tất cả các marker

        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    if (loadError) {
        console.error("Google Maps API load error:", loadError);
        return <div className="text-red-500 text-center py-8">Error loading maps. Please check your API key or network connection.</div>;
    }
    if (!isLoaded) return <div className="text-center py-8">Loading Maps...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Locations</h1>

            <div className="mb-8 rounded-lg overflow-hidden shadow-lg"> {/* Thêm shadow và rounded corners */}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter} // Bản đồ sẽ tập trung vào vị trí mặc định này
                    zoom={12} // Mức zoom ban đầu
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {/* Markers for each location */}
                    {locations.map(loc => (
                        <MarkerF
                            key={loc.id}
                            position={{ lat: loc.lat, lng: loc.lng }}
                            title={loc.name}
                            // Bạn có thể thêm onClick để hiển thị InfoWindow khi click vào marker
                            // onClick={() => alert(`${loc.name}\n${loc.address}\n${loc.phone}`)}
                        />
                    ))}
                </GoogleMap>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map(loc => (
                    <div key={loc.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{loc.name}</h2>
                        <p className="text-gray-700 mb-1">{loc.address}</p>
                        <p className="text-gray-600">Phone: {loc.phone}</p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline mt-3 inline-block"
                        >
                            Get Directions
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LocationPage;
