import React, { useState, useEffect, useRef } from "react";
import "./TeacherOverview.css";

export default function TeacherCreate({classes}) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [classId, setClass] = useState("");
  const [errMess, setErrMess] = useState("");
  const [succMe, setSuccMe] = useState("");
  const [create, setCreate] = useState('student');
  const inRef = useRef(null);

  const createRef = useRef(null);

  

  return (
    <div>
      <div className="create-header">
        <h2>Create a...</h2>
        <select
          ref={createRef}
          onChange={(e) => {
            setCreate(e.target.value);
          }}
        >
          <option value="student">Student</option>
          <option value="assignment">Assignment</option>
          <option value="class">Class</option>
        </select>
      </div>
      <div className="create-body">
      {create == "student" && <StudentForm classes = {classes}/>}
        {/* {create == "student" && (
          {/* <div className="create-student">
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
          </div> */}

        {/* {create == "assignment" && (
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
        )} */}
        {create == "assignment" && <AssignmentForm classes={classes}/>}
      </div>
    </div>
  );
}


function StudentForm({ classes }){
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const inRef = useRef(null);
  const [errMess, setErrMess] = useState("");
  const [succMe, setSuccMe] = useState("");
  const [classId, setClass] = useState("");

  const createStudent = async (e) => {
    console.log(inRef.current.value);
    const url = `http://localhost:5000/api/student/${first}/${last}/${inRef.current.value}`;
    console.log("Sending request at ", url, "...");
    try {
      const res = await fetch(url, {
        method: "POST",
      });
      const p = await res.json();
      setErrMess("");
      setSuccMe("Student added!");
    } catch (err) {
      setErrMess("Error connecting to API");
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setClass(inRef.current.value);
      if (first && last && classId) {
        createStudent();
      } else {
        setErrMess("Please fill in all fields");
      }
    }
  };

  useEffect(() => {
    console.log(classes);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [first, last, classId]);
  return(
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
  )
}

function AssignmentForm({ classes }){
  const inRef = useRef(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [succMess, setSuccMess] = useState("");
  const [errMess, setErrMess] = useState("");

  const createAssignment = async() => {
    const url = `http://localhost:5000/api/assignment/${name}/${desc}/${inRef.current.value}/math/${target}/${dueDate}`;

    try{
      const res = await fetch(url, {
        method: 'POST',
      });
      const q = await res.json();
      setSuccMess("Assignment added!");
    } catch(err){
      setErrMess("Failed to post to database");
    }
  }

  const handleEnter = () => {
    if(inRef.current.value && name && desc && target && dueDate){
      createAssignment();
    }else{
      setErrMess("Please enter all fields");
    }
  }


  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      handleEnter();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [name,desc,target,dueDate]);

  return(
    <div className="create-student">
      <form>
        <div className="teacher-inputs">
          <label>Assignment Name</label>
          <input onChange = {(e) => {setName(e.target.value)}}></input>
        </div>
        <div className="teacher-inputs">
          <label>Description</label>
          <input onChange = {(e) => {setDesc(e.target.value)}}></input>
        </div>
        <div className="teacher-inputs"> 
        <label>Target Score</label>
        <input type="text" onChange = {(e) => {setTarget(e.target.value)}}></input>
        </div>
        <div className="teacher-inputs">
          <label>Due Date</label>
          <input type = "date" onChange={(e) => {setDueDate(e.target.value)}}></input>
        </div>
        <div className="teacher-inputs">
                <label>Class</label>
                <select
                  ref={inRef}
                >
                  {classes.map((classItem) => (
                    <option key={classItem.class_id} value={classItem.class_id}>
                      {classItem.class_name}
                    </option>
                  ))}
                </select>
                </div>
      </form>
      <button onClick={handleEnter}>Create</button>
      {succMess && <h1 style={{color:'green', fontSize: '2vmin'}}>{succMess}</h1>}
      {errMess && <h1 style={{color:'red', fontSize: '2vmin'}}>{errMess}</h1>}
    </div>
  )
}