import React,{useState,useEffect} from 'react';
import txtLang from "../lang.json"
import ListTrips from './ListTrips';
const InfoBar = (props) => {
    const [listTrips, setListTrips] = useState([]);
   var qrcode="/qrcode/"+props.user.token

useEffect(() => {
    fetch("/getUserInfo ",{
        method:'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify({"token":props.user.token})})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result[0].trips);
        setListTrips(result[0].trips)
        
        //setTrips(result.trips)
      },
      (error) => {console.log(error);
      }
    ).then(
        console.log(props.user.token)
    )

 
},[])


   

    return (
      <div
        className="Itineraire text-light barres "
        id="Itineraire"
        // style={{ width: 20 + "vw" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className=" link bi bi-x"
          viewBox="0 0 16 16"
          onClick={()=>props.setInfoPerso(false)}
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
    
        <div className=''>
            <p>{txtLang[props.lang][22]} {props.user.name} </p>
            <p>{txtLang[props.lang][32]} {props.user.token}</p>
            <p>{txtLang[props.lang][23]} </p>
            <img alt="qr code" src={qrcode} />
        </div>
        <p>{txtLang[props.lang][33]}</p>
    {listTrips!=={} ? (<ListTrips lang={props.lang}  itinerary={props.itinerary} setItinerary={props.setItinerary}  listTrips={listTrips} setListTrips={setListTrips}/>) :null}
      </div>
    );
};

export default InfoBar;