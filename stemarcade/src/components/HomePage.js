import React, { useEffect, useState } from "react"
import ArcadeOutline from "./ArcadeOutline";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import TeacherLogin from "./TeacherLogin";
import StudentLogin from "./StudentLogin";
import logo from "../images/stemarcadelogo.png";
import bg from "../images/homepagebg3.gif";

export default function TeacherSelect({ onTeacherLogin }){

    const [login, setLogin] = useState("");
    const [selected, setSelected] = useState('Student');

    const handleKeyDown = (event) => {
        if (event.keyCode === 40 || event.keyCode === 38) {
            setSelected(selected === 'Student' ? 'Teacher' : 'Student');
        }

        if (event.key === 'Enter') {
            setLogin(selected);
        }

    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selected]);

    return (
          <div
            style={{
              backgroundImage: `url(${bg})`, // Set background image to your animated GIF
              backgroundSize: "contain", // Optional: Adjust the background size
              backgroundPosition: "center",
              width: "100vw",
              height: "100vh", // Optional: Set the width of the image
              textAlign: "center", // Center horizontally
              // margin: "auto", // Center vertically
              zIndex: -2, // Remove any extra space below the image
              className: "gif-background",
            }}
          >
            <img
              src={logo}
              alt="Your Image Alt Text"
              style={{
                width:"60%",
              height:"60%",
              textAlign:"left",
              }}
            />
            {login === "" && 
                <div>
                    <h1>The sky is the limit.</h1>
                    <h1>{selected === "Student" ? ">Student" : "Student"}</h1>
                    <h1>{selected === "Teacher" ? ">Teacher" : "Teacher"}</h1>
                </div>}
                {login === 'Student' && <div><StudentLogin/> <NotA notA="student" onClick = {() => {setLogin("")}}/></div>}
                {login === 'Teacher' && <div><TeacherLogin onLogin={onTeacherLogin}/> <NotA notA = "teacher" onClick={() => {setLogin("")}}/></div>}
          </div>
    );
}

function NotA({ notA, onClick }){
  return(
    <div className="notA" onClick={onClick}>
      <h1>Not a {notA}?</h1>
    </div>
  )
}