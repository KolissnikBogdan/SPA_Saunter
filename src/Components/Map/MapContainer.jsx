/* global google */
import React, { useState } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import MapDirectionsRenderer from "./MapDirectionsRenderer";
import {compose} from "redux";

const Map = compose(withScriptjs, withGoogleMap)(props => {
    const [state, setState] = useState({ markers: [] });

    const mapClicked = (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }

        const { markers } = state;
        markers.push(newMarker);
        setState({ markers: markers });
        props.onMapChange(markers);
    }

    return (
        <GoogleMap
            defaultCenter={ props.defaultCenter }
            defaultZoom={ props.defaultZoom }
            onClick={ mapClicked }>
            {state.markers && state.markers.map(el => <Marker key={el.lat + el.lng} position={el} />)}
            {state.markers && state.markers.length > 1 ? <MapDirectionsRenderer
                places={ state.markers }
                travelMode={ google.maps.TravelMode.DRIVING }/> : null}
        </GoogleMap>
    )
})

export default Map;