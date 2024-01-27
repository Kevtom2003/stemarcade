import React, { useEffect, useState } from "react"

export default function TeacherSelect(){
    const [selected, setSelected] = useState('Student');

    const handleKeyDown = (event) => {
        if(event.keyCode === 40 || event.keyCode === 38){
            setSelected(selected === 'Student' ? 'Teacher' : 'Student');
        }

        console.log(selected);
    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selected]);

    return(
        <div>
            <h1>{selected === 'Student' ? '>Student' : 'Student'}</h1>
            <h1>{selected === 'Teacher' ? '>Teacher' : 'Teacher'}</h1>
        </div>
    )
}