/* global google */
import React, { useState } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import MapDirectionsRenderer from "./MapDirectionsRenderer";
import { compose, withProps } from 'recompose'

const Map = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSnZh4D_rLPyato0wJ79ch-vdxslft4CI&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        defaultCenter:{lat: 49.453115, lng: 32.045652},
        defaultZoom: 14
    }),
    withScriptjs,
    withGoogleMap)(props => {
    const [directions, setDirections] = useState(null);
    const [state, setState] = useState({ markers: [] });

    const mapClicked = (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }

        const { markers } = state;
        markers.push(newMarker);

        if(markers.length > 1) {
            const waypoints = markers.map(p => ({
                location: { lat: p.lat, lng: p.lng },
                stopover: true
            }));

            const origin = waypoints.shift().location;
            const destination = waypoints.pop().location;

            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: waypoints,
                    optimizeWaypoints: true
                },
                (result, status) => {
                    //console.log({result, status});
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                    }
                }
            );
        }

        setState({ markers: markers });
        props.onMapChange(markers);
    }

    let markers = null;

    if(props.onlyView) {
        markers = props.route;
    } else {
        markers = state.markers;
    }

    return (
        <GoogleMap
            defaultCenter={ props.defaultCenter }
            defaultZoom={ props.defaultZoom }
            onClick={ !props.onlyView ? mapClicked : null }>
            { markers && markers.map(el => <Marker key={ el.lat + el.lng } position={ el} />) }
            { markers && markers.length > 1 ? <MapDirectionsRenderer
                directions={ directions }/> : null }
        </GoogleMap>
    )
})

export default Map;