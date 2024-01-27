import React from "react";
import './App.css';
import {BrowserRouter,Route} from "react-router-dom"

import Home from "./components/teacherHome";
import TeacherSelect from './components/TeacherSelect';
import Login from './components/Login';

const App = () => {
  return(
  <BrowserRouter>
    <Route path="/home" element={<Home />} />
    <Route path="/teacherselect" element={<TeacherSelect />} />
    <Route path="/login" element={<Login/>}/>
  </BrowserRouter>
  )
}
export default App;
