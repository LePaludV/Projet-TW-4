import Main from './Main'

import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import socketIOClient from "socket.io-client";
import { initiateSocketConnection } from './socketio.service';

function App() {
  const [lang, setLang] = useState("en")

  
  useEffect(() => {
    initiateSocketConnection();
  }, []);


    return (
      <div id='App' className="container-fluid ">
       
        <BrowserRouter>
        <Routes>
           <Route path="/" element={<Main lang={lang} setLang={setLang}/>} />
           {/* <Route path="/test" element={<Test/>} /> */}
        </Routes>
        </BrowserRouter>
      </div>
    );
}


export default App;
