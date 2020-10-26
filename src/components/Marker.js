import React from 'react';
import PropTypes from 'prop-types';
import InfoWindow from './InfoWindow';

const Marker = ({ show, place }) => {
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: show ? 'red' : 'blue',
        cursor: 'pointer',
        zIndex: 10,
    };

    return (
        <>
            <div style={markerStyle} />
            {show && <InfoWindow place={place} />}
        </>
    );
};

Marker.propTypes = {
    show: PropTypes.bool.isRequired,
    place: PropTypes.shape({
        name: PropTypes.string,
        formatted_address: PropTypes.string,
        rating: PropTypes.number,
        types: PropTypes.arrayOf(PropTypes.string),
        price_level: PropTypes.number,
        opening_hours: PropTypes.shape({
            open_now: PropTypes.bool,
        }),
    }).isRequired,
};

export default Marker;
