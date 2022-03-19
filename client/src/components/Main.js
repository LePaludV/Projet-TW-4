import React,{useState} from 'react';
import Header from './Header';
import OSMap from './OSMap';
import Itineraire from './Itineraire'
import Sidebar from './Sidebar';
const Main = (props) => {
    const [sideBar, setSideBar] = useState(false)
      
    return (
        <div className="Main row">
                <Header sideBar={sideBar} setSideBar={setSideBar}/>
                <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
                <OSMap/>
                <Itineraire/>
            
        </div>
    );
};

export default Main;