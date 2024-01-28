import React, { useEffect, useState, useRef } from 'react';
import InputField from './InputField';
import './TeacherLogin.css';

export default function TeacherLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleKeyDown = (event) => {
        console.log(username, password);
        if(event.keyCode === 13 && username != "" && password != ""){
            handleEnter();
        }
    }

    const inputRef = useRef(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        if(inputRef.current && username == "" && password == ""){
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
            else{
                setErrorMessage("Invalid login!");
            }
        }catch(err){
            setErrorMessage("Invalid login!");
            console.error(err);
        }
    }
    
    const handleLogin = () => {
        console.log("Logging in...");
           }

    return(
        <div>
            {errorMessage && <div style = {{color:'red'}}>{errorMessage}</div>}
            <h1>Username</h1>
            <input ref = {inputRef}  onChange={(e) => {setUsername(e.target.value)}} className='inputField'></input>
            <h1>Password</h1>
            <input onChange = {(e) => {setPassword(e.target.value)}} className='inputField'></input>
            {/* <button onClick={handleEnter}>Press me</button> */}
        </div>
    )
}
