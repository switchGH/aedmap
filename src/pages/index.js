import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPlaces } from '../api';
import GoogleMap from '../components/GoogleMap';
import Marker from '../components/Marker';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: { lat: 34.4111, lng: 135.3008 },
            places: [],
        };
    }

    async componentDidMount() {
        const params = {
            sw_lat: 34.4064388134989,
            sw_lng: 135.295107346642,
            ne_lat: 34.41583173345069,
            ne_lng: 135.30649265335796
        }
        const data = await getAllPlaces(params).catch(e => {
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

    // 地図移動後の地点探索
    onDragEnd = async(map) => {
        //const latlng = map.getCenter(); // 表示領域の中心座標
        const latlngBounds = map.getBounds(); //表示領域の座標
        const swLatlng = latlngBounds.getSouthWest(); // 南西
        const neLatlng = latlngBounds.getNorthEast(); // 北東
        const params = {
            sw_lat: swLatlng.lat(),
            sw_lng: swLatlng.lng(),
            ne_lat: neLatlng.lat(),
            ne_lng: neLatlng.lng()
        }
        const data = await getAllPlaces(params).catch(e => {
            console.log(e);
        });
        data.forEach(place => {
            place.show = false;
        });
        this.setState({ places: data });
    }

    render() {
        const { places, center } = this.state;

        return (
            <div style={{ height: '70vh', width: '70vh' }}>
                <GoogleMap
                    defaultZoom={16}
                    center={center} // 大阪市役所
                    onChildClick={this.onChildClickCallback}
                    onDragEnd={this.onDragEnd}
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
