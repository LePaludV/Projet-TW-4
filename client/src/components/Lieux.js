import React from 'react';
import {Marker,Popup} from 'react-leaflet';
import L from "leaflet";
import PinPlace from "../img/pin-carte.png";
var IconPlace = L.icon({
    iconUrl: PinPlace,
    iconSize: [32, 32],
    //iconAnchor: [0, 32],
  });

const Lieux = (props) => {
    return (
        <div>
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
        </div>
    );
};

export default Lieux;