import React from "react";
import './App.css';
import {Routes,Route} from "react-router-dom"

import Home from "./components/teacherHome";
import TeacherSelect from './components/TeacherSelect';
import Login from './components/Login';

const App = () => {
  return(
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/teacherselect" element={<TeacherSelect />} />
    <Route path="/login" element={<Login/>}/>
  </Routes>
  )
}
export default App;
