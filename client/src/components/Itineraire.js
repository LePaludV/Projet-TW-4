import React,{useEffect} from 'react';

const Itineraire = (props) => {   
    return (
        <div className='Itineraire text-light' id='Itineraire' style={{width:20+"vw"}}>
            {(
             props.placesSelected.map((place) => (
                 <p key={place._id} >{place.titre}</p>
             ))
             )}
        </div>
    );
};

export default Itineraire;