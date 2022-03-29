import React,{useEffect} from 'react';

const Itineraire = (props) => {
    var w=0;
    if(props.barItineraire) w=20;
    console.log(props.placesSelected);
    console.log("up");


    
    return (
        <div className='Itineraire text-light' id='Itineraire' style={{width:w+"vw"}}>
            {props.barItineraire &&(
             props.placesSelected.map((place) => (
                 <p key={place._id} >{place.titre}</p>
             ))
             )}
        </div>
    );
};

export default Itineraire;