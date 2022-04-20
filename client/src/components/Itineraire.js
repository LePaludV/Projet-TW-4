import React,{useEffect} from 'react';
import txtLang from "../lang.json";
import { sendIntineraire } from '../socketio.service.js';
const Itineraire = (props) => {   
    const supprPlace = (e)=>{
        //console.log(e);
        var tmp=props.placesSelected.filter(place => place._id!==e)
        props.setPlacesSelected(tmp);
    }
    const sendItinerary = () => {
        
      var places = []
      props.placesSelected.map((e)=>(
        places.push([e.longiture,e.latitude])
      ))
     
      
      sendIntineraire(({token:props.user.token,location:[props.location.coordinates.lng,props.location.coordinates.lat],Itineraire:places}),
      res => {console.log(res);})
    }
    return (
        <div className='Itineraire text-light ' id='Itineraire' style={{width:20+"vw"}}>
            {(
             props.placesSelected.map((place) => (
                 <p className="d-flex justify-content-between" key={place._id} >{place.titre}<button  onClick={(e)=>{supprPlace(place._id)}} className="btn btn-dark"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
               </svg> </button></p>
             ))
             )}
{props.placesSelected.length>0 ?<div className="d-grid btn btn-info" onClick={(e)=>{sendItinerary() }}>{txtLang[props.lang][13]}</div>: txtLang[props.lang][14]+"." }
             
        </div>
    );
};

export default Itineraire;