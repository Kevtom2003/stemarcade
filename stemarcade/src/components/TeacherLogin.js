import React, { useEffect, useState, useRef } from 'react';
import InputField from './InputField';
import './TeacherLogin.css';

export default function TeacherLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleKeyDown = (event) => {
        console.log(username, password);
        if(event.keyCode === 13 && username != "" && password != ""){
            handleEnter();
        }
    }

    const inputRef = useRef(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        if(inputRef.current){
            inputRef.current.focus();
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [username, password]);


    const handleEnter = async () => {
        try{
            const res = await fetch(`http://localhost:5000/api/teacher/${username}/${password}`);
            const p = await res.json();
            if(p.length > 0){
                handleLogin();
            }
            console.log(p);
        }catch(err){
            console.error(err);
        }
    }
    
    const handleLogin = () => {
        console.log("Logging in...");
    }

    return(
        <div>
            <h1>Username</h1>
            <input ref = {inputRef} placeholder="teacher username" onChange={(e) => {setUsername(e.target.value)}} className='inputField'></input>
            <h1>Password</h1>
            <input placeholder="teacher password" onChange = {(e) => {setPassword(e.target.value)}} className='inputField'></input>
            {/* <button onClick={handleEnter}>Press me</button> */}
        </div>
    )
}