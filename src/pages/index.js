import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPlaces } from '../api';
import GoogleMap from '../components/GoogleMap';
import Marker from '../components/Marker';

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
                    defaultZoom={15}
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

export default Home;
