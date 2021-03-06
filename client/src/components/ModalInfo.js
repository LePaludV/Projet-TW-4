import React,{useState,useEffect} from 'react';
import AjoutAvis from './AjoutAvis'
import ListAvis from './ListAvis';
import txtLang from "../lang.json"
const ModalInfo = (props) => {
  const [avis, setAvis] = useState([])
  const [newAvis, setNewAvis] = useState([])

  //On récupèrle les avis d'un lieux 

  useEffect(() => {
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
      console.log(result);
      setAvis(result)
      
    },
    (error) => {console.log(error);
    }
  )
  
   
  }, [])
  
     



  const closeModal=()=>{   
      
      //On mes envoie la maj des avis au serveur 

      fetch("/addAvis",{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"id":props.place._id,"avis":newAvis})
    }).then( ()=>{
      props.setIsModalOpen(!props.isModalOpen);
    document.querySelector(".OSMap").style.display=""    })
   

  } 

  const calculMoyenne=()=>{
    let listAvis = (newAvis).concat(avis)
    let t=0
    listAvis.map(x=> t+=parseInt((x.note)))
    let r = t / (listAvis.length)
    //console.log(t,r);
    return Math.round(r)
  }
  let moyenne =calculMoyenne() 
    return (
        <div className="Modal" id="ModalInfoLieux">
          <div className="modal-content">
            <div className=" position-relative modal-header">
          <h2 className=" position-absolute top-0 start-50 translate-middle modal-title">{props.place.titre}</h2>
          <h6 className="position-absolute top-50 start-50 translate-middle">{txtLang[props.lang][30]}{moyenne}/5</h6>
          
          <button className='btn-close' onClick={() =>{closeModal()}} ></button>
        </div>
        <div className="modal-body">
        <p>{props.place.description[props.lang]!=='.' ? props.place.description[props.lang] : txtLang[props.lang][31]}</p>
      </div>
      <div className="modal-footer d-inline">
        <h3>{txtLang[props.lang][28]}</h3>
        <AjoutAvis newAvis={newAvis} setNewAvis={setNewAvis} user={props.user} lang={props.lang}/>
        <ListAvis  lang={props.lang} newAvis={newAvis} setNewAvis={setNewAvis} avis={avis} setAvis={setAvis}/>
        
       

      </div>
       
        </div>
        
        <div>


        </div>
        
        </div>
    );
};

export default ModalInfo;