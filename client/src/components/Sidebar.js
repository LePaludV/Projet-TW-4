import React from "react";
import txtLang from "../lang.json"
const Sidebar = (props) => {

    let rayon=props.rayon;
    //console.log(props.places);
    
    const addPlace=(e)=>{
      var lieu=props.places.filter( (p)=> p._id===e)
      var tmp = props.placesSelected
      if(!tmp.includes(lieu[0])){
        props.setPlacesSelected(tmp.concat(lieu))
      } 
    }

  return (
      
      <div className="Sidebar barres"
      //style={{width:20+"vw"}} 
      >
        


        {(
          <div className="bar text-light">
            <label htmlFor="rayon" className="form-label">  {txtLang[props.lang][3]} : {rayon} km</label>
            <input type="range" className="form-range" min="0.5" max="10" step="0.5" value={rayon} id="rayon" onChange={(e)=>props.setRayon(e.target.value)}></input>

              <h2>  {txtLang[props.lang][4]}</h2>
                <ul>
                {props.places.map((place) => (
                  <li className="p-1 d-flex justify-content-between" key={place._id}>{place.titre} <button className="btn btn-dark" onClick={(e)=>{addPlace(place._id)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg></button></li>
                  ))
                }
                    
                </ul>

          </div>)}
    </div>
  );
};

export default Sidebar;
