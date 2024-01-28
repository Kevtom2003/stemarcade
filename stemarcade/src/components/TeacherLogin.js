import React, { useEffect, useState } from 'react';


export default function TeacherLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
    const handleLogin = async () => {
        try{
            const res = await fetch(`http://localhost:5000/api/teacher/${username}/${password}`);
            const p = await res.json();
            console.log(p);
        }catch(err){
            console.error(err);
        }

    }

    return(
        <div>
            <h1>Username</h1>
            <input placeholder="teacher username" onChange={(e) => {setUsername(e.target.value)}}></input>
            <h1>Password</h1>
            <input placeholder="teacher password" onChange = {(e) => {setPassword(e.target.value)}}></input>
            <button onClick={handleLogin}>Press me</button>
        </div>
    )
}