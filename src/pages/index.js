import React, { useEffect, useState } from 'react';
import GoogleMap from '../components/GoogleMap';
// import Marker from '../components/Marker';

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.description}
      </div>
    </div>`;

const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach(place => {
        markers.push(
            new maps.Marker({
                position: {
                    lat: place.geometry.location.lat,
                    lng: place.geometry.location.lng,
                },
                map,
            })
        );

        infowindows.push(
            new maps.InfoWindow({
                content: getInfoWindowString(place),
            })
        );
    });

    markers.forEach((marker, i) => {
        marker.addListener('click', () => {
            infowindows[i].open(map, marker);
        });
    });
};

export default function Home() {
    // 基準点: 大阪市役所
    const defaultSettings = {
        center: {
            lat: 34.4111,
            lng: 135.3008,
        },
        zoom: 11
    };

    const [places, setPlaces] = useState();

    useEffect(() => {
        fetch('places.json')
            .then(response => response.json())
            .then(data => {
                data.results.forEach(result => {
                    result.show = false; // eslint-disable-line no-param-reassign
                });
                setPlaces(data.results);
            });
    });

    return (
        <div style={{ height: '70vh', width: '70vh' }}>
            <GoogleMap
                defaultCenter={defaultSettings.center}
                defaultZoom={defaultSettings.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
            />
        </div>
    );
}
