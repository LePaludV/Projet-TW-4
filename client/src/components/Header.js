import React from 'react';
import txtLang from "../lang.json"

const Header = (props) => {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="container-fluid">
            <h2 className="text-light">
              
              {txtLang[props.lang][0]}
              <button className="btn btn-lg text-light" onClick={() => props.setSideBar(!props.sideBar)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </h2>
            <a className="text-light">{txtLang[props.lang][1]}</a>
            <a className="text-light" href="#Itineraire">
            {txtLang[props.lang][2]}
            </a>

       

          </div>
        </nav>
      </div>
    );
};

export default Header;