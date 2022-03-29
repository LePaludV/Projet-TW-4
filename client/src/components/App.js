import Main from './Main'

import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import {useState,useEffect} from 'react';


function App() {
  const [lang, setLang] = useState("en")
  
  
    return (
      <div className="App container-fluid ">
       
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
