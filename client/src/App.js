import React from "react";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";

import LoginPage from "./components/views/LoginPage/LoginPage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter 
      future={{
        v7_startTransition: true,
    }}>
    
      <div>
        { /*내용..*/ }
        
          <Routes>
            <Route exact path = "/" element = {<LandingPage/>}/>
            <Route exact path = "login" element = {<LoginPage/>}/>
            <Route exact path = "/register" element = {<RegisterPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
