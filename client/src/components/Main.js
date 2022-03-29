import React,{useState,useEffect} from 'react';
import Header from './Header';
import OSMap from './OSMap';
import Itineraire from './Itineraire'
import Sidebar from './Sidebar';
import GetPlaces from './GetPlaces'
import GetLocation from './GetLocation';

const Main = (props) => {
    const [sideBar, setSideBar] = useState(false)
    const [location, setLocation] = useState({coordinates:{lat:43.927,lng:2.14}, loaded:false});
    const [places, setPlaces] = useState([]);
    const [rayon, setRayon] = useState(10);
    
    useEffect(() => {
      fetch(" /listPlaces")
        .then(res => res.json())
        .then(
          (result) => {
            setPlaces(result);
          },
          (error) => {console.log(error);
          }
        )
    }, []);
    
    return (
        <div className="Main row">
                <GetPlaces rayon={rayon} location={location} places={places} setPlaces={setPlaces}></GetPlaces>
                <GetLocation location={location} setLocation={setLocation} ></GetLocation>
                <Header lang={props.lang} setLang={props.setLang} sideBar={sideBar} setSideBar={setSideBar}/>
                <Sidebar lang={props.lang} rayon={rayon} setRayon={setRayon} places={places} sideBar={sideBar} setSideBar={setSideBar} />
                <OSMap locations={location} setLocation={setLocation} places={places}/>
                <Itineraire/>
            
        </div>
    );
};

export default Main;