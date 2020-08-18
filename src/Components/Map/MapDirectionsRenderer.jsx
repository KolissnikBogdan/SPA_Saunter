/* global google */
import React, {useEffect, useState} from "react";
import { DirectionsRenderer } from "react-google-maps";

function MapDirectionsRenderer(props) {
    return (
        props.directions && <DirectionsRenderer directions={props.directions} />
    );
}

export default MapDirectionsRenderer;