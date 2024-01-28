import React, { useEffect, useState } from "react"
import ArcadeOutline from "./ArcadeOutline";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import TeacherLogin from "./TeacherLogin";
import StudentLogin from "./StudentLogin";


export default function TeacherSelect({ onTeacherLogin }){

    const [login, setLogin] = useState("");
    const [selected, setSelected] = useState('Student');

    const handleKeyDown = (event) => {
        if(event.keyCode === 40 || event.keyCode === 38){
            setSelected(selected === 'Student' ? 'Teacher' : 'Student');
        }

        if(event.key === 'Enter'){
            setLogin(selected);
        }

    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selected]);

    return(
        <ArcadeOutline style = {{display:"flex", justifyContent: "center", alignItems: "center", zIndex: 0}}>
            { login === "" && (

                <div>
                    <h1 style={{ fontFamily: 'Press Start 2P', fontSize: '20px', color: '#fcd400' }}>{selected === 'Student' ? '>Student' : 'Student'}</h1>
                    <h1 style={{ fontFamily: 'Press Start 2P', fontSize: '20px', color: '#fcd400' }}>{selected === 'Teacher' ? '>Teacher' : 'Teacher'}</h1>
                </div>
            )}
            { login === "Teacher" && (
                <TeacherLogin onLogin={onTeacherLogin}/>
            )}
            { login === "Student" && (
                <StudentLogin />
            )}
        </ArcadeOutline>
    )
}