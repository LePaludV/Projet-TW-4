import React,{useState,useEffect} from 'react';
import Header from './Header';
import OSMap from './OSMap';
import Itineraire from './Itineraire'
import Sidebar from './Sidebar';
import GetPlaces from './GetPlaces'
import GetLocation from './GetLocation';
import Infobar from './InfoBar'

const Main = (props) => {
    const [sideBar, setSideBar] = useState(false)
    const [barItineraire, setBarItineraire] = useState(false)
    const [placesSelected,setPlacesSelected]=useState([])
    const [location, setLocation] = useState({coordinates:{lat:43.927,lng:2.14}, loaded:false});
    const [places, setPlaces] = useState([]);
    const [AllPlaces, setAllPlaces] = useState([]);
    const [rayon, setRayon] = useState(10);
    const [user, setUser] = useState({name:localStorage.getItem('name'),token:localStorage.getItem('token')})
    const [infoPerso, setInfoPerso] = useState(false)
    const [itinerary, setItinary] = useState(null)

    useEffect(() => {
      fetch(" /listPlaces")
        .then(res => res.json())
        .then(
          (result) => {
            setAllPlaces(result);
            setPlaces(result)
          },
          (error) => {console.log(error);
          }
        )
        
    }, []);
    
    useEffect(() => {
      if(user.name==null && user.token!=null){
        var token=user.token;
        fetch("/getUserInfo ",{
          method:'POST',
          headers: {'Accept': 'application/json','Content-Type': 'application/json'},
          body:JSON.stringify({"token":token})})
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var res=result[0]
          var name=res.username
          setUser({name:name,token:token})
          localStorage.setItem("name",name)
          localStorage.setItem("token",token)
          //setTrips(result.trips)
        },
        (error) => {console.log(error);
        }
      )
      }
    
      
    }, [user])
    

 
    
    return (
        <div className="Main row">
                <GetPlaces AllPlaces={AllPlaces} rayon={rayon} setRayon={setRayon} location={location} places={places} setPlaces={setPlaces}/>
                <GetLocation location={location} setLocation={setLocation} />
                <Header infoPerso={infoPerso} setInfoPerso={setInfoPerso} user={user} setUser={setUser} barItineraire={barItineraire} setBarItineraire={setBarItineraire} lang={props.lang} setLang={props.setLang} sideBar={sideBar} setSideBar={setSideBar}/>
                {sideBar ? <Sidebar placesSelected={placesSelected} setPlacesSelected={setPlacesSelected}  lang={props.lang} rayon={rayon} setRayon={setRayon} places={places} /> :null}
               
                <OSMap itinerary={itinerary} setItinerary={setItinary} user={user} barItineraire={barItineraire} setBarItineraire={setBarItineraire} placesSelected={placesSelected} rayon={rayon} setRayon={setRayon} setPlacesSelected={setPlacesSelected} lang={props.lang} locations={location} setLocation={setLocation} places={places}/>
               {barItineraire ?<Itineraire  itinerary={itinerary} setItinerary={setItinary} location={location} setLocation={setLocation} user={user} setUser={setUser} placesSelected={placesSelected} setPlacesSelected={setPlacesSelected} lang={props.lang} /> :null} 
               {infoPerso ? <Infobar  lang={props.lang} setLang={props.setLang} infoPerso={infoPerso} setInfoPerso={setInfoPerso} user={user} setUser={setUser}/>:null} 
        </div>
    );
};

export default Main;