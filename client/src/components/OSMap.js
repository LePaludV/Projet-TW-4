import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GetLocation from "./GetLocation.js";
import UpdateMap from "./UpdateMapLocation";
import PinYou from "../img/maps-and-flags.png";

import GetPlaces from "./GetPlaces.js";
import Lieux from "./Lieux.js"
var IconYou = L.icon({
  iconUrl: PinYou,
  iconSize: [32, 32],
  //iconAnchor: [0, 32],
});



const OSMap = (props) => {
  const locations = GetLocation(); 
  
// PB -> Quand l'user accept pas le temps de prendre en compte avant le chargement du reste  



  //console.log(props.places);
  console.log(locations);
  return (
    <div className="OSMap col">
      <div className="border rounded-2">
        <MapContainer
          center={locations.coordinates}
          position={locations.coordinates}
          zoom={14}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UpdateMap locations={locations.coordinates}></UpdateMap>
          {locations.loaded && (
            <Marker icon={IconYou} position={locations.coordinates}>
              <Popup position={locations.coordinates}> Vous êtes ici </Popup>
            </Marker>
          )}
          <Lieux places={props.places} /> 
          
        </MapContainer>
      </div>
    </div>
  );
};

export default OSMap;
