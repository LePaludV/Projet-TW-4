import React,{useState} from 'react';
import Header from './Header';
import OSMap from './OSMap';
import Itineraire from './Itineraire'
import Sidebar from './Sidebar';
import GetPlaces from './GetPlaces'

const Main = (props) => {
    const [sideBar, setSideBar] = useState(false)
    const [places, setPlaces] = useState(GetPlaces());

    return (
        <div className="Main row">
                <Header sideBar={sideBar} setSideBar={setSideBar}/>
                <Sidebar places={places} setPlaces={setPlaces} sideBar={sideBar} setSideBar={setSideBar} />
                <OSMap places={places} setPlaces={setPlaces}/>
                <Itineraire/>
            
        </div>
    );
};

export default Main;