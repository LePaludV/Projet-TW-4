import React from "react";
import getPlaces from "./GetPlaces.js"
import txtLang from "../lang.json"
const Sidebar = (props) => {

    let rayon=props.rayon;
    //console.log(props.places);
    
  return (
      
      <div className="Sidebar"style={{width:20+"vw"}} >
        


        {(
          <div className="bar text-light">
            <label htmlFor="rayon" className="form-label">  {txtLang[props.lang][3]} : {rayon} km</label>
            <input type="range" className="form-range" min="0.5" max="10" step="0.5" value={rayon} id="rayon" onChange={(e)=>props.setRayon(e.target.value)}></input>

              <h2>  {txtLang[props.lang][4]}</h2>
                <ul>
                {props.places.map((place) => (
                  <li key={place._id}>{place.titre}</li>
                  ))
                }
                    
                </ul>

          </div>)}
    </div>
  );
};

export default Sidebar;
