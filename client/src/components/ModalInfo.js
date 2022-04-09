import React,{useState} from 'react';
import AjoutAvis from './AjoutAvis'
import ListAvis from './ListAvis';

const ModalInfo = (props) => {
  const [avis, setAvis] = useState([])

  //On récupèrle les avis d'un lieux 
      fetch("/getAvis",{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"id":props.place._id})
    })
    .then(res => res.json())
    .then(
      (result) => {
        setAvis(result)
      },
      (error) => {console.log(error);
      }
    )



  const closeModal=()=>{   
      props.setIsModalOpen(!props.isModalOpen)
      document.querySelector(".OSMap").style.display=""    
      
      //On mes envoie la maj des avis au serveur 

      fetch("/addAvis",{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"id":props.place._id,"avis":avis})
    })
  } 
    return (
        <div className="Modal" id="ModalInfoLieux">
          <div className="modal-content">
            <div className="modal-header">
          <h2 class="modal-title">{props.place.titre}</h2>
          
          <button className='btn-close' onClick={() =>{closeModal()}} ></button>
        </div>
        <div class="modal-body">
        <p>{props.place.description[props.lang]!=='.' ? props.place.description[props.lang] : "Pas de description"}</p>
      </div>
      <div class="modal-footer d-inline">
        <h3>Avis</h3>
        <AjoutAvis avis={avis} setAvis={setAvis} user={props.user} lang={props.lang}/>
        <ListAvis  avis={avis} setAvis={setAvis}/>
       

      </div>
       
        </div>
        
        <div>


        </div>
        
        </div>
    );
};

export default ModalInfo;