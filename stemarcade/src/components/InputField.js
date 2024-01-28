import { useEffect, useRef, useState } from 'react'
import './InputField.css'
export default function InputField({ focus, onChange, value }){
    const [InWidth, setWidth] = useState(2);

    const handleChange = (e) => {
        setWidth(e.target.value.length * 5);
        if(onChange){
            onChange(e);
        }
    }

    const inputRef = useRef(null);
    useEffect(() => {
        if(inputRef.current && focus){
            inputRef.current.focus();
        }
    }, []);

    return(
        <div>
            <input ref = {inputRef} className = "retro-input" style={{width:`${InWidth}%`}} onChange={handleChange} value={value}></input>
        </div>
    )
}