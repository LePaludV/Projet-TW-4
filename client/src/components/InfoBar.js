import React,{useState,useEffect} from 'react';

const InfoBar = (props) => {
    const [listTrips, setListTrips] = useState([]);

useEffect(() => {
    fetch("/getUserInfo ",{
        method:'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify({"token":props.user.token})})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        setListTrips(result)
        //setTrips(result.trips)
      },
      (error) => {console.log(error);
      }
    ).then(
        console.log(props.user)
    )

 
}, [])


   

    return (
        <div className='Itineraire text-light ' id='Itineraire' style={{width:20+"vw"}}>
            <p>{props.user.name}</p>
        </div>
    );
};

export default InfoBar;