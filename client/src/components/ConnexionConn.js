import React,{useEffect} from 'react';
import { useParams,Routes,Navigate,Route   } from 'react-router-dom';

const ConnexionConn = (props) => {
    
    const token=useParams();
            localStorage.setItem("token",token.token)
            window.location.href = "/"
        
        
    
    
   
    
   
    

    return (
        <div>
        </div>
    );
};

export default ConnexionConn;