import React, { useEffect, useState } from 'react';
import InputField from './InputField';

export default function TeacherLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleKeyDown = (event) => {
        if(event.keyCode === 13){
            console.log(username, password);
        }
        if(event.keyCode === 13 && username != "" && password != ""){
            handleEnter();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);


    const handleEnter = async () => {
        console.log("hey there");
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
            <InputField focus = {true} onChange = {(e) => {setUsername(e.target.value)}}/>
            {/* <input placeholder="teacher username" onChange={(e) => {setUsername(e.target.value)}}></input> */}
            <h1>Password</h1>
            <InputField onChange = {(e) => {setPassword(e.target.value)}}/>
            {/* <input placeholder="teacher password" onChange = {(e) => {setPassword(e.target.value)}}></input> */}
            <button onClick={handleEnter}>Press me</button>
        </div>
    )
}