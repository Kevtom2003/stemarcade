import React, { useEffect, useState } from "react"
import ArcadeOutline from "./ArcadeOutline";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import TeacherLogin from "./TeacherLogin";
import StudentLogin from "./StudentLogin";
import logo from "../images/stemarcadelogo.png";
import bg from "../images/homepagebg3.gif";

export default function TeacherSelect() {

    const [login, setLogin] = useState("");
    const [selected, setSelected] = useState('Student');

    const navigate = useNavigate();

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
        <ArcadeOutline style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

            {login === "" && (

                <div style={{
                    backgroundImage: `url(${bg})`, // Set background image to your animated GIF
                    backgroundSize: 'contain', // Optional: Adjust the background size
                    backgroundPosition: 'center',
                    width: '70%', // Optional: Set the width of the image
                    height: 'auto', // Optional: Maintain aspect ratio
                    textAlign: 'center', // Center horizontally
                    margin: 'auto', // Center vertically
                    display: 'block', // Remove any extra space below the image
                }}>
                    <img src={logo} alt="Your Image Alt Text" width="50%" height="50%" />
                    <h1>The sky is the limit.</h1>
                    <h1>{selected === 'Student' ? '>Student' : 'Student'}</h1>
                    <h1>{selected === 'Teacher' ? '>Teacher' : 'Teacher'}</h1>
                </div>
            )}
            {login === "Teacher" && (
                <TeacherLogin />
            )}
            {login === "Student" && (
                <StudentLogin />
            )}
        </ArcadeOutline>
    )
}