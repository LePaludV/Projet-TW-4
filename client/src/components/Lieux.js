import React from 'react';
import {Marker,Popup} from 'react-leaflet';
import L from "leaflet";
import PinPlace from "../img/pin-carte.png";
import txtLang from "../lang.json"

var IconPlace = L.icon({
    iconUrl: PinPlace,
    iconSize: [32, 32],
    //iconAnchor: [0, 32],
  });

const Lieux = (props) => {
  console.log("Liste des lieux a afficher",props.places);
  return (
    <div >

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
            <div className="text-center">
            {" "}
            {place.titre}{" "}
            <br></br>
            <div className="btn-group">
            <button className='btn btn-primary btn-sm' onClick={() =>{console.log(place.description[props.lang])} }>{txtLang[props.lang][10]}</button>
            <button className='btn btn-primary btn-sm' onClick={()=>{
              var tmp=props.placesSelected
              
              if(!tmp.includes(place)) tmp.push(place)


              props.setPlacesSelected(tmp)
            } }>{txtLang[props.lang][11]}</button>
            </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default Lieux;