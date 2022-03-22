import React from 'react';

const Header = ({sideBar,setSideBar}) => {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid">
            <h2 className="text-light">
              Titre App
              <button className="btn btn-lg text-light" onClick={() => setSideBar(!sideBar)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </h2>
            <a className="text-light">Map</a>
            <a className="text-light" href="#Itineraire">
              Intineraire
            </a>
          </div>
        </nav>
      </div>
    );
};

export default Header;