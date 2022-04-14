import React from 'react';
import { useParams } from 'react-router-dom';

const ConnexionConn = (props) => {
    const sendToken=(token)=>{
        
        fetch("/getUserInfo ",{
            method:'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body:JSON.stringify({"token":token})})
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            var res=result[0]
            var name=res.username
            localStorage.setItem("name",name)
            localStorage.setItem("token",token)
            //setTrips(result.trips)
          },
          (error) => {console.log(error);
          }
        ).then(
    
        )
        
    
    }
    
    const token=useParams();
    console.log(token.token);
    sendToken(token.token);
    window.location.href = "/";

    

    return (
        <div>
        </div>
    );
};

export default ConnexionConn;