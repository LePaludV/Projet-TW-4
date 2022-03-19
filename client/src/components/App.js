import Main from './Main'

import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import {useState,useEffect} from 'react';


function App() {
  
 
  
    return (
      <div className="App container-fluid ">
       
        <BrowserRouter>
        <Routes>
           <Route path="/" element={<Main/>} />
           {/* <Route path="/test" element={<Test/>} /> */}
        </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
