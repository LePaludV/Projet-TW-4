import React,{useEffect,useState} from 'react';

const GetLocation = () => {
    const [coords, setCoords] = useState({lat:43.927, lng: 2.14})
   
  useEffect(() => {
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(function(position) {
           setCoords({lat :position.coords.latitude, lng : position.coords.longitude});
          });
    } else {
      //Localisation impossibe sur ce navigateur
      setCoords({lat:43.927, lng: 2.14})
    }      
  }, [])
    return coords;
};

export default GetLocation;