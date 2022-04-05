import React,{useState} from 'react';
import {Marker,Popup} from 'react-leaflet';
import L from "leaflet";
import PinPlace from "../img/pin-carte.png";
import txtLang from "../lang.json"
import ModalInfo from './ModalInfo';
import Modal from 'react-modal'

var IconPlace = L.icon({
    iconUrl: PinPlace,
    iconSize: [32, 32],
    //iconAnchor: [0, 32],
  });

const Lieux = (props) => {
  Modal.setAppElement('#App');
  //console.log("Liste des lieux a afficher",props.places);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [placeToShow, setPlaceToShow] = useState(null)
  const openModal=(e)=>{
    setIsModalOpen(!isModalOpen)
    document.querySelector(".OSMap").style.display="none"
    var lieu=props.places.filter( (p)=> p._id==e)
    setPlaceToShow(lieu[0])
  }
  const closeModal=()=>{   
    setIsModalOpen(!isModalOpen)
    document.querySelector(".OSMap").style.display=""     
} 
  return (
    <div >

      {props.places.map((place) => (
        <Marker
          key={place._id}
          icon={IconPlace}
          position={{
            lat: place.latitude,
            lng: place.longiture,
          }}
        >
          <Popup
            position={{
              lat: place.latitude,
              lng: place.longiture,
            }}
          >
            <div className="text-center">
            {" "}
            {place.titre}{" "}
            <br></br>
            <div className="btn-group">
            <button className='btn btn-primary btn-sm' onClick={() =>{openModal(place._id)}} >{txtLang[props.lang][10]}</button>
            <button className='btn btn-primary btn-sm' onClick={(e)=>{
              var tmp=props.placesSelected
              props.setBarItineraire(true)
              
              if(!tmp.includes(place)){
                props.setPlacesSelected(tmp.concat([place]))
              } 


              
            } }>{txtLang[props.lang][11]}</button>
            </div>
            </div>
            
          </Popup>
        </Marker>
        
      ))}
     <Modal isOpen={isModalOpen} onRequestClose={closeModal}  shouldCloseOnOverlayClick={true} ><ModalInfo lang={props.lang} place={placeToShow} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/></Modal>
    </div>
  );
};

export default Lieux;