import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPlaces } from '../api';
import GoogleMap from '../components/GoogleMap';

const InfoWindow = props => {
    const { place } = props;
    const infoWindowStyle = {
        position: 'relative',
        bottom: 150,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };

    return (
        <div style={infoWindowStyle}>
            <div style={{ fontSize: 14 }}>{place.name}</div>
            {/* <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {place.rating}
          {' '}
        </span>
        <span style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
        <span style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {place.types[0]}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {'$'.repeat(place.price_level)}
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>
        {place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div> */}
        </div>
    );
};

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

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
        };
    }

    async componentDidMount() {
        const data = await getPlaces().catch(e => {
            console.log(e);
        });
        data.forEach(place => {
            place.show = false;
        });
        this.setState({ places: data });
    }

    onChildClickCallback = key => {
        this.setState(state => {
            const index = state.places.findIndex(e => e.id == key);
            state.places[index].show = !state.places[index].show;
            return { places: state.places };
        });
    };

    render() {
        const { places } = this.state;

        return (
            <div style={{ height: '70vh', width: '70vh' }}>
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{ lat: 34.4111, lng: 135.3008 }} // 大阪市役所
                    onChildClick={this.onChildClickCallback}
                >
                    {places.map(place => (
                        <Marker
                            key={place.id}
                            lat={place.latitude}
                            lng={place.longitude}
                            show={place.show}
                            place={place}
                        />
                    ))}
                </GoogleMap>
            </div>
        );
    }
}

InfoWindow.propTypes = {
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

export default Home;
