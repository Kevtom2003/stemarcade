import React, { useEffect } from "react";
import './App.css';
import './fonts/index.css'
import {Routes,Route} from "react-router-dom"
import HomePage from './components/HomePage'
import GalagaGame from "./components/galagaGame";
import TeacherOverview from "./components/TeacherOverview";
import { useNavigate } from "react-router-dom";

import GalagaIntro from "./components/galagaIntro";
const App = () => {
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = React.useState("")

  useEffect(() => {
    if (teacherId !== "") {
      navigate(`/teacher/${teacherId}`);
    }
  }, [teacherId]);

  return(
  <Routes>
    <Route path = "/" element = {<HomePage onTeacherLogin={setTeacherId}/>}/>
    <Route path = "/galaga" element = {<GalagaGame/>}/>
    <Route path = "/teacher/:teacher_id" element = {<TeacherOverview teacherId={teacherId}/>} />
    <Route path = "/galagaIntro" element = {<GalagaIntro/>}/>
  </Routes>
  )
}
export default App;