import React from "react";
import './App.css';
import {Routes,Route} from "react-router-dom"

import Home from "./components/teacherHome";
import TeacherSelect from './components/TeacherSelect';
import Login from './components/Login';
import GalagaGame from "./components/galagaGame";

const App = () => {
  return(
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/teacherselect" element={<TeacherSelect />} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/galagaGame" element={<GalagaGame />}/>
  </Routes>
  )
}
export default App;
