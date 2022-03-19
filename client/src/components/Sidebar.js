import React from "react";

const Sidebar = (props) => {
    console.log(props.sideBar);
    var w=0;
    if(props.sideBar) w=20;
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
