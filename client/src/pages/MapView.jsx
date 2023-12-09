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
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

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

  
  return <><Filter />
  {isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
        
        {specimenData.map(s=>{
          return(
            s.lat && s.long &&
            <>
            {s.color ? 
            <Marker
            key={s.id}
            position={{ lat: s.lat, lng: s.long }}
            onLoad={marker => {
              const customIcon = (opts) => Object.assign({
                path: 'M7.8,1.3L7.8,1.3C6-0.4,3.1-0.4,1.3,1.3c-1.8,1.7-1.8,4.6-0.1,6.3c0,0,0,0,0.1,0.1 l3.2,3.2l3.2-3.2C9.6,6,9.6,3.2,7.8,1.3C7.9,1.4,7.9,1.4,7.8,1.3z M4.6,5.8c-0.7,0-1.3-0.6-1.3-1.4c0-0.7,0.6-1.3,1.4-1.3 c0.7,0,1.3,0.6,1.3,1.3 C5.9,5.3,5.3,5.9,4.6,5.8z',
                fillColor: '#34495e',
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 1,
                scale: 1,
              }, opts);
  
              marker.setIcon(customIcon({
                fillColor: 'green',
                strokeColor: 'white'
              }));
              return markerLoadHandler(marker, s)
            }} 
            />
            : <Marker key={s.id} position={{ lat: s.lat, lng: s.long }} />
          }
            </>
          )
        })}
      </GoogleMap>
  ) : <></>}
  </>
}

export default React.memo(MapView)