/* global google */
import React, {useEffect, useState} from "react";
import { DirectionsRenderer } from "react-google-maps";

function MapDirectionsRenderer(props) {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const { places, travelMode } = props;

        const waypoints = places.map(p => ({
            location: { lat: p.lat, lng: p.lng },
            stopover: true
        }));
        console.log(places);
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;

        let directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: travelMode,
                waypoints: waypoints
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    setError(result);
                }
            }
        );
    }, [props]);

    if (error) {
        return <h1>{error}</h1>;
    }
    return (
        directions && (
            <DirectionsRenderer directions={directions} />
        )
    );
}

export default MapDirectionsRenderer;