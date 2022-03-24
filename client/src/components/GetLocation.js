import React,{useEffect,useState} from 'react';

const GetLocation = (props) => {
    
   
  useEffect(() => {
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(function(position) {
           props.setLocation({coordinates :{
             lat :position.coords.latitude,
             lng :position.coords.longitude
            }, 
            loaded:true
          });
          });
    } else {
      //Localisation impossibe sur ce navigateur
      props.setLocation({
        coordinates:{
          lat:43.927,
          lng:2.14
        },
          loaded:false
        });
    }      
  }, [])
    return null;
};

export default GetLocation;