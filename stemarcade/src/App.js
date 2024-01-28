import React from "react";
import './App.css';
import './fonts/index.css'
import {Routes,Route} from "react-router-dom"
import HomePage from './components/HomePage'
import GalagaGame from "./components/galagaGame";

const App = () => {
  return(
  <Routes>
    <Route path = "/" element = {<HomePage/>}/>
    <Route path = "/galaga" element = {<GalagaGame/>}/>
  </Routes>
  )
}
export default App;
