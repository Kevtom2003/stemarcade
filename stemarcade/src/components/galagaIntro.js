import React, { useEffect, useState } from "react"
import ArcadeOutline from "./ArcadeOutline";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import StudentLogin from "./StudentLogin";
import logo from "../images/mathvsmartianslogo.png";
import bg from "../images/galagaintrobg.gif";
import GalagaGame from "./galagaGame";

export default function TeacherSelect() {
    const [login, setLogin] = useState("");
    const [selected, setSelected] = useState('Play');

    const navigate = useNavigate();

    const handleKeyDown = (event) => {

        if (event.keyCode === 40 || event.keyCode === 38) {
            setSelected(selected === 'Play' ? 'Quit' : 'Play');
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
                    <h1>{selected === 'Play' ? '>Play' : 'Play'}</h1>
                    <h1>{selected === 'Quit' ? '>Quit' : 'Quit'}</h1>
                </div>
            )}
            {login === "Play" && (
                navigate("/galaga")
            )}
            {login === "Quit" && (
                navigate("/")
            )}
        </ArcadeOutline>
    )
}