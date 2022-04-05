import React from 'react';

const ModalInfo = (props) => {
  const closeModal=()=>{   
      props.setIsModalOpen(!props.isModalOpen)
      document.querySelector(".OSMap").style.display=""     
  } 
    return (
        <div className="Modal" id="ModalInfoLieux">
          <button onClick={() =>{closeModal()}} >close</button>
        <h1>{props.place.titre}</h1>
        <p>{props.place.description[props.lang]}</p>
        </div>
    );
};

export default ModalInfo;