import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import SpecimenAPI from '../../services/SpecimenAPI';
import { useState, useEffect } from 'react';
import { useDataContext } from '../context/DataProvider';
import Filter from '../components/Filter';

const apiKey = import.meta.env.REACT_APP_GOOGLE_API_KEY

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapView() {
  const { specimenData, setSpecimenData } = useDataContext();
  const [markerMap, setMarkerMap] = useState({});

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBHC4fDrFVwAG87KIot6WIcSw3d_GjvR60'

  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    if (map && specimenData) {
      const bounds = new window.google.maps.LatLngBounds(center);
      specimenData.forEach((s) => {
        if (s.lat && s.long) {
          bounds.extend(new window.google.maps.LatLng(s.lat, s.long));
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, specimenData]);

  
  return (
    <>
      <Filter />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <></>
          {specimenData.map((s, index) => {
            return (
              s.lat && s.long && (
                <div key={index}>
                    <Marker
                      position={{ lat: s.lat, lng: s.long }}
                      key={index}
                      />
                </div>
              )
            );
          })}
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(MapView)