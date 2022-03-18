import React,{useState} from 'react';
import Header from './Header';
import OSMap from './OSMap';
const Main = (props) => {
    
      
    return (
        <div className="Main">
            <div className="container-fluid">
                <Header/>
                <OSMap key={1} />
            </div>
            
        </div>
    );
};

export default Main;