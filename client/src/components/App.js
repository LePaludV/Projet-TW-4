import Main from './Main'
import Test from './Test'
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import {useState,useEffect} from 'react';


function App() {
  
 
  
    return (
      <div className="App">
       
        <BrowserRouter>
        <Routes>
           <Route path="/" element={<Main/>} />
           <Route path="/test" element={<Test/>} />
        </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
