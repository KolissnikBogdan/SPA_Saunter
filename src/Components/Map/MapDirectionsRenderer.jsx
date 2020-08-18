/* global google */
import React, {useEffect, useState} from "react";
import { DirectionsRenderer } from "react-google-maps";

function MapDirectionsRenderer(directions, ...props) {

    /*useEffect(() => {
        const { places, travelMode } = props;

        const waypoints = places.map(p => ({
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
                travelMode: travelMode,
                waypoints: waypoints
            },
            (result, status) => {
                console.log(result)
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
    }*/

    console.log(directions);

    return (
        directions && (
            <DirectionsRenderer directions={directions} />
        )
    );
}

export default MapDirectionsRenderer;