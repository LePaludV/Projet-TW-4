import React from 'react';
import {useMap} from "react-leaflet" 
const UpdateMap = ({locations}) => {
    const map = useMap();
    map.panTo(locations);
    return null;
};

export default UpdateMap;