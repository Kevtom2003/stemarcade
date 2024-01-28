import { useState, useRef, useEffect } from "react"
import './TeacherLogin.css'

export default function StudentLogin(){
    const [name, setName] = useState("");
    const [classId, setClassId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const inputRef = useRef(null);

    const handleLogin = () => {
        console.log("Logging in...");
    }

    const handleEnter = (e) => {
        if(e.keyCode === 13){
            try{
            const names = name.split(" ");
            const first = names[0];
            const last = names[1];
            handleGetStudent(first, last, classId);
            }catch(err){
                setErrorMessage("Invalid name");
            }
        }
    }

    const handleGetStudent = async(first, last, classId) => {
        const url = `http://localhost:5000/api/student/${first}/${last}/${classId}`;

        try{
            const res = await fetch(url);
            const q = await res.json();
            if(q.length > 0){
                handleLogin();
            }else{
                setErrorMessage("Invalid login!");
            }
        } catch(err){
            console.error(err);
            setErrorMessage("Invalid login");
        }
    }
        useEffect(() => {
        window.addEventListener('keydown', handleEnter);
        if(inputRef.current && name == ""){
            inputRef.current.focus();
        }

        return () => {
            window.removeEventListener('keydown', handleEnter);
        }
    }, [name, classId]);

    return(
        <div>
            {errorMessage && <div style = {{color:'red'}}>{errorMessage}</div>}
            <h1>Full name</h1>
            <input ref = {inputRef} onChange={(e) => {setName(e.target.value)}} className="inputField"></input>
            <h1>Class ID</h1>
            <input onChange={(e) => {setClassId(e.target.value)}} className="inputField"></input>
        </div>
    )
}
