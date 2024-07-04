import { useState, useEffect } from "react";

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "Geolocation is not supported by your browser",
      });
      setLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setPosition(position);
      setLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError({
        code: error.code,
        message: error.message,
      });
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, error, loading };
};

export default useGeolocation;
