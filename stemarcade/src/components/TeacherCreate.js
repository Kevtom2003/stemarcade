import React, { useState, useEffect, useRef } from "react";
import "./TeacherOverview.css";

export default function TeacherCreate({classes}) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [classId, setClass] = useState("");
  const [errMess, setErrMess] = useState("");
  const [succMe, setSuccMe] = useState("");
  const inRef = useRef(null);

  const createStudent = async(e) => {
    console.log(inRef.current.value);
    const url = `http://localhost:5000/api/student/${first}/${last}/${inRef.current.value}`;
    console.log("Sending request at ", url, "...");
    try{
      const res = await fetch(url, {
        method: 'POST',
      })
      const p = await res.json();
      setErrMess("");
      setSuccMe("Student added!");
    } catch(err){
      setErrMess("Error connecting to API");
      console.error(err);
    }
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      setClass(inRef.current.value);
      if(first && last && classId){
        createStudent();
      } 
      else{
        setErrMess("Please fill in all fields");
      }
    }
  }

  useEffect(() => {
    console.log(classes);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [first,last,classId]);

  return (
    <div>
      <div className="create-header">
        <h2>Create a...</h2>
        <select>
          <option>Student</option>
          <option>Assignment</option>
          <option>Class</option>
        </select>
      </div>
      <div className="create-body">
        <div className="create-student">
          <form>
            <div className="teacher-inputs">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
              />
            </div>
            <div className="teacher-inputs">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                onChange={(e) => {
                  setLast(e.target.value);
                }}
              />
            </div>
            <div className="teacher-inputs">
              <label>Class</label>
              <select
                ref={inRef}
                onChange={(e) => {
                  setClass(e.target.value);
                }}
              >
                {classes.map((classItem) => (
                  <option key={classItem.class_id} value={classItem.class_id}>
                    {classItem.class_name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button
            onClick={(e) => {
              createStudent(e);
            }}
          >
            Create
          </button>
          {errMess && (
            <h1 style={{ color: "red", fontSize: "3vmin" }}>{errMess}</h1>
          )}
          {succMe && (
            <h1 style={{ color: "green", fontSize: "3vmin" }}>{succMe}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
