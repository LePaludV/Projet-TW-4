import React,{useEffect} from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  } from 'react-leaflet'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import UpdateMap from "./UpdateMapLocation";
import PinYou from "../img/maps-and-flags.png";
import Lieux from "./Lieux.js"
import txtLang from "../lang.json"

var IconYou = L.icon({
  iconUrl: PinYou,
  iconSize: [32, 32],
  //iconAnchor: [0, 32],
});
const color = { color: 'red' }


const OSMap = (props) => {
  const locations = props.locations; 
  console.log(props.itinerary);

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
              <Popup position={locations.coordinates}> {txtLang[props.lang][12]} </Popup>
            </Marker>
          )
          
          }
          <Lieux user={props.user} barItineraire={props.barItineraire} setBarItineraire={props.setBarItineraire} placesSelected={props.placesSelected} setPlacesSelected={props.setPlacesSelected} lang={props.lang} locations={locations} places={props.places} /> 
          {props.itinerary != null ? <Polyline pathOptions={color} positions={props.itinerary} /> : null}
        </MapContainer>
      </div>
    </div>
  );
};

export default OSMap;
