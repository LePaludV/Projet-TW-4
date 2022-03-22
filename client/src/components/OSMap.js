import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GetLocation from "./GetLocation.js";
import UpdateMap from "./UpdateMapLocation";
import PinYou from "../img/maps-and-flags.png";
import PinPlace from "../img/pin-carte.png";
import GetPlaces from "./GetPlaces.js";
var IconYou = L.icon({
  iconUrl: PinYou,
  iconSize: [32, 32],
  //iconAnchor: [0, 32],
});

var IconPlace = L.icon({
  iconUrl: PinPlace,
  iconSize: [32, 32],
  //iconAnchor: [0, 32],
});

const OSMap = (props) => {
  const locations = GetLocation();
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

          {props.places.map((place) => (
            <Marker
              key={place._id}
              icon={IconPlace}
              position={{
                lat: place.latitude,
                lng: place.longiture,
              }}
            >
              <Popup
                position={{
                  lat: place.latitude,
                  lng: place.longiture,
                }}
              >
                {" "}
                {place.titre}{" "}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default OSMap;
