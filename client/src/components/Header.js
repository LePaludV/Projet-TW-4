import React from 'react';

const Header = () => {
    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid"> 
                <h2 className="text-light">Titre App </h2>
                <a className="text-light" >Map</a>
                <a className="text-light" >Intineraire</a>
            </div>

            </nav>
        </div>
    );
};

export default Header;