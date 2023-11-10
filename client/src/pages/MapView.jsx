import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

export default function MapView() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_API_KEY,
      });
      const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    
      return (
        <div className="App">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
            />
          )}
        </div>
      );
}

//defaultCenter={{ lat: 42.370807, lng: -72.517014 }}




