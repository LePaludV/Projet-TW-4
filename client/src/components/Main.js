import React,{useState,useEffect} from 'react';
import Header from './Header';
import OSMap from './OSMap';
import Itineraire from './Itineraire'
import Sidebar from './Sidebar';
import GetPlaces from './GetPlaces'
import GetLocation from './GetLocation';

const Main = (props) => {
    const [sideBar, setSideBar] = useState(false)
    const [location, setLocation] = useState(GetLocation())
    const [places, setPlaces] = useState([]);

    useEffect(() => {
      fetch(" /listPlaces")
        .then(res => res.json())
        .then(
          (result) => {
            setPlaces(GetPlaces(location,result));
          },
          // Remarque : il faut gérer les erreurs ici plutôt que dans
          // un bloc catch() afin que nous n’avalions pas les exceptions
          // dues à de véritables bugs dans les composants.
          (error) => {console.log(error);
          }
        )
    }, []);
    
    return (
        <div className="Main row">
                <Header sideBar={sideBar} setSideBar={setSideBar}/>
                <Sidebar places={places} sideBar={sideBar} setSideBar={setSideBar} />
                <OSMap locations={location} setLocation={setLocation} places={places}/>
                <Itineraire/>
            
        </div>
    );
};

export default Main;