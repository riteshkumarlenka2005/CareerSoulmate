// Geolocation utilities for finding nearby colleges

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface GeolocationResult {
    success: boolean;
    coordinates?: Coordinates;
    error?: string;
}

// Get user's current location
export const getCurrentLocation = (): Promise<GeolocationResult> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({
                success: false,
                error: 'Geolocation is not supported by your browser',
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    success: true,
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                });
            },
            (error) => {
                let errorMessage = 'Unable to get your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }
                resolve({
                    success: false,
                    error: errorMessage,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // Cache for 5 minutes
            }
        );
    });
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
};

const toRad = (deg: number): number => {
    return deg * (Math.PI / 180);
};

// Major Indian city coordinates for demo
export const INDIAN_CITIES: Record<string, Coordinates> = {
    'Delhi': { latitude: 28.6139, longitude: 77.2090 },
    'Mumbai': { latitude: 19.0760, longitude: 72.8777 },
    'Bangalore': { latitude: 12.9716, longitude: 77.5946 },
    'Chennai': { latitude: 13.0827, longitude: 80.2707 },
    'Kolkata': { latitude: 22.5726, longitude: 88.3639 },
    'Hyderabad': { latitude: 17.3850, longitude: 78.4867 },
    'Pune': { latitude: 18.5204, longitude: 73.8567 },
    'Ahmedabad': { latitude: 23.0225, longitude: 72.5714 },
    'Jaipur': { latitude: 26.9124, longitude: 75.7873 },
    'Lucknow': { latitude: 26.8467, longitude: 80.9462 },
    'Chandigarh': { latitude: 30.7333, longitude: 76.7794 },
    'Bhopal': { latitude: 23.2599, longitude: 77.4126 },
    'Patna': { latitude: 25.5941, longitude: 85.1376 },
    'Thiruvananthapuram': { latitude: 8.5241, longitude: 76.9366 },
    'Guwahati': { latitude: 26.1445, longitude: 91.7362 },
};

// Get city coordinates from location name
export const getCityCoordinates = (location: string): Coordinates | null => {
    const normalizedLocation = location.toLowerCase();
    for (const [city, coords] of Object.entries(INDIAN_CITIES)) {
        if (normalizedLocation.includes(city.toLowerCase())) {
            return coords;
        }
    }
    return null;
};

// Format distance for display
export const formatDistance = (km: number): string => {
    if (km < 1) {
        return `${Math.round(km * 1000)}m`;
    }
    if (km >= 100) {
        return `${Math.round(km)} km`;
    }
    return `${km.toFixed(1)} km`;
};
