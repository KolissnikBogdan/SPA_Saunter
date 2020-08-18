const computeDistance = (pathArr) => {
    let total = 0;

    for (let i = 0; i < pathArr.length - 1; i++) {
        let pos1 = new window.google.maps.LatLng(pathArr[i].lat, pathArr[i].lng);
        let pos2 = new window.google.maps.LatLng(pathArr[i + 1].lat, pathArr[i + 1].lng);
        total += window.google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
    }

    if(total < 1000) {
        return (Math.round(total)) + ' m';
    } else {
        return (total / 1000).toFixed(2) + ' km';
    }
}

export default computeDistance;