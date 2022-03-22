import React from "react";
import getPlaces from "./GetPlaces.js"
const Sidebar = (props) => {
    //console.log(props.sideBar); //Si true affiche la bar latérale 
    var w=0;
    if(props.sideBar) w=20;


    console.log(props.places);
    
  return (
      
      <div className="Sidebar"style={{width:w+"vw"}} >
        {props.sideBar &&(
          <div className="bar text-light">
              <h2>Liste des endroits</h2>
                <ul>
                    <li>YO</li>
                    <li>Lo</li>
                    <li>al</li>
                </ul>

          </div>)}
    </div>
  );
};

export default Sidebar;
