import React from 'react';
import txtLang from "../lang.json"
const ListTrips = (props) => {
    
    //console.log(props.listTrips);
    var names=[]
    for (const property in props.listTrips)
    { 
        names.push(property)
        }
        

    const loadTrip =(e)=>{
        //console.log(e.target.id);
        props.setItinerary(props.listTrips[e.target.id])
    }
    return (
        <div>
            {names.map((e,i)=>(
            
            <p key={i}>
                {names[i]}  
                <button type="button" id={names[i]} className="btn btn-outline-light btn-sm" onClick={loadTrip}>{txtLang[props.lang][34]}</button>
            </p>
            
            ))}

                </div>
    );
};

export default ListTrips;