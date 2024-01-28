import { useEffect, useRef } from 'react'
import './InputField.css'
export default function InputField(){
    const inputRef = useRef(null);
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, []);

    return(
        <div>
            <input ref = {inputRef} className = "retro-input"></input>
        </div>
    )
}