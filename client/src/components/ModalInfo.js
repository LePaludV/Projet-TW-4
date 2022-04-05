import React from 'react';

const ModalInfo = (props) => {
  var listAvis;
  //On récupèrle les avis d'un lieux 
      fetch("/create",{
        method:'POST',
        body:JSON.stringify({id:props.place._id})
    })
    .then(res => res.json())
    .then(
      (result) => {
        listAvis=result
      },
      (error) => {console.log(error);
      }
    )



  const closeModal=()=>{   
      props.setIsModalOpen(!props.isModalOpen)
      document.querySelector(".OSMap").style.display=""    
      
      //On mes envoie la maj des avis au serveur 
  } 
    return (
        <div className="Modal" id="ModalInfoLieux">
          <button onClick={() =>{closeModal()}} >close</button>
        <h1>{props.place.titre}</h1>
        <p>{props.place.description[props.lang]!=='.' ? props.place.description[props.lang] : "Pas de description"}</p>
        
        
        <div>


        </div>
        
        </div>
    );
};

export default ModalInfo;