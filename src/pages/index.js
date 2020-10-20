import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// examples:
import GoogleMap from '../components/GoogleMap';

const Home = () => {
    const [places, setPlaces] = useState([]);

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
            defaultZoom={10}
            defaultCenter={{ lat: 34.4111, lng: 135.3008}}
        />
        </div>

    );
};

export default Home;
