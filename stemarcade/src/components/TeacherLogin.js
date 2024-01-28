import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import { Navigate } from 'react-router-dom';

export default function TeacherLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    // const handleKeyDown = (event) => {
    //     if(event.keyCode === 13 && username != "" && password != ""){
    //         console.log("submit");
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     }
    // }, []);


    const handleEnter = async () => {
        try{
            const res = await fetch(`http://localhost:5000/api/teacher/${username}/${password}`);
            const p = await res.json();
            if(p.length > 0){
                setLoggedIn(true);
            }
            console.log(p);
        }catch(err){
            console.error(err);
        }

        if (loggedIn) {
            Navigate(`/teacher`);
        }
    }
    
    // const handleLogin = () => {
    //     console.log("Logging in...");
    //     Redirect("/teacher/:username/:password");
    // }

    return(
        <div>
            <h1>Username</h1>
            {/* <InputField/> */}
            <input placeholder="teacher username" onChange={(e) => {setUsername(e.target.value)}}></input>
            <h1>Password</h1>
            <input placeholder="teacher password" onChange = {(e) => {setPassword(e.target.value)}}></input>
            <button onClick={handleEnter}>Press me</button>
        </div>
    )
}