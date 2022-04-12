import React from 'react';

const InfoBar = (props) => {
    return (
        <div className='Itineraire text-light ' id='Itineraire' style={{width:20+"vw"}}>
            <p>{props.user.name}</p>
        </div>
    );
};

export default InfoBar;