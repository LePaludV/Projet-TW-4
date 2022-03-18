import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GetLocation from "./GetLocation";
import UpdateMap from "./UpdateMapLocation";

var IconYou =L.divIcon({className:"bi bi-geo-alt"});




const OSMap = (props) => {
  
  const locations=GetLocation();
  console.log(locations);


  return (
    <div className="OSMap">
      <div className="col">
        
        <MapContainer center={locations} position={locations} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UpdateMap locations={locations}></UpdateMap>
          <Marker icon={IconYou} position={locations}></Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default OSMap;
