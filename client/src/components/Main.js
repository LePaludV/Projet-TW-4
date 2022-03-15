import React from 'react';
import Header from './Header';
import OSMap from './OSMap';
const Main = (props) => {

    return (
        <div className={Main}>
            <div className='.container-fluid'>
                <Header/>
                <OSMap/>
            </div>
            
        </div>
    );
};

export default Main;