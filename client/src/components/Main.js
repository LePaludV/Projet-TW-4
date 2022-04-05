import React,{useState,useEffect} from 'react';
import Header from './Header';
import OSMap from './OSMap';
import Itineraire from './Itineraire'
import Sidebar from './Sidebar';
import GetPlaces from './GetPlaces'
import GetLocation from './GetLocation';

const Main = (props) => {
    const [sideBar, setSideBar] = useState(false)
    const [barItineraire, setBarItineraire] = useState(false)
    const [placesSelected,setPlacesSelected]=useState([])
    const [location, setLocation] = useState({coordinates:{lat:43.927,lng:2.14}, loaded:false});
    const [places, setPlaces] = useState([]);
    const [AllPlaces, setAllPlaces] = useState([]);
    const [rayon, setRayon] = useState(10);
    
    /*useEffect(() => {
      fetch(" /listPlaces")
        .then(res => res.json())
        .then(
          (result) => {
            setAllPlaces(result);
          },
          (error) => {console.log(error);
          }
        )
    }, []);*/
    

 

    return (
        <div className="Main row">
                <GetPlaces AllPlaces={AllPlaces} rayon={rayon} setRayon={setRayon} location={location} places={places} setPlaces={setPlaces}/>
                <GetLocation location={location} setLocation={setLocation} />
                <Header barItineraire={barItineraire} setBarItineraire={setBarItineraire} lang={props.lang} setLang={props.setLang} sideBar={sideBar} setSideBar={setSideBar}/>
                {sideBar ? <Sidebar placesSelected={placesSelected} setPlacesSelected={setPlacesSelected}  lang={props.lang} rayon={rayon} setRayon={setRayon} places={places} /> :null}
                <OSMap barItineraire={barItineraire} setBarItineraire={setBarItineraire} placesSelected={placesSelected} setPlacesSelected={setPlacesSelected} lang={props.lang} locations={location} setLocation={setLocation} places={places}/>
               {barItineraire ?<Itineraire placesSelected={placesSelected} setPlacesSelected={setPlacesSelected} lang={props.lang} /> :null} 
                
        </div>
    );
};

export default Main;
