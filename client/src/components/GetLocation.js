import React,{useEffect,useState} from 'react';

const GetLocation = () => {
    const [coords, setCoords] = useState({
      coordinates:{
        lat:43.927,
        lng:2.14
      },
      loaded:false})
   
  useEffect(() => {
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(function(position) {
           setCoords({coordinates :{
             lat :position.coords.latitude,
             lng :position.coords.longitude
            }, 
            loaded:true
          });
          });
    } else {
      //Localisation impossibe sur ce navigateur
      setCoords({
        coordinates:{
          lat:43.927,
          lng:2.14
        },
          loaded:false
        });
    }      
  }, [])
    return coords;
};

export default GetLocation;