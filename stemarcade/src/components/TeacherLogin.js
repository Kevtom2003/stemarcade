// import React, { useEffect, useState } from 'react';

// export default function TeacherLogin({ onLogin }){
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [loggedIn, setLoggedIn] = useState(false);

//     const [teacherId, setTeacherId] = useState("");

//     const handleKeyDown = (event) => {
//         if(event.keyCode === 13 && username != "" && password != ""){
//             console.log("submit");
//         }
//     }

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         if(inputRef.current && username == "" && password == ""){
//             inputRef.current.focus();
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         }
//     }, [username, password]);

//     // useEffect(() => {
//     //     if (loggedIn) {
//     //         onLogin(teacherId);
//     //     }
//     // }, [loggedIn]);

//     // const setLoginId = (id) => {
//     //     setTeacherId(id);
//     // }

//     const handleEnter = async () => {
//         try{
//             const res = await fetch(`http://localhost:5000/api/teacher/${username}/${password}`);
//             const p = await res.json();
//             console.log(p[0]);
//             onLogin(p[0].teacher_id);
//             if(p.length > 0){
//                 // setLoginId(p[0].teacher_id);
//                 setLoggedIn(true);
//             }
//             // console.log(p);
//         }catch(err){
//             setErrorMessage("Invalid login!");
//             console.error(err);
//         }

//         // if (loggedIn) {
//         //     navigate(`/teacher/${p[0].teacher_id}`);
//         // }
//     }

//     // const handleLogin = () => {
//     //     console.log("Logging in...");
//     //     Redirect("/teacher/:username/:password");
//     // }

//     return(
//         <div>
//             {errorMessage && <div style = {{color:'red'}}>{errorMessage}</div>}
//             <h1>Username</h1>
//             <InputField/>
//             {/* <input placeholder="teacher username" onChange={(e) => {setUsername(e.target.value)}}></input> */}
//             <h1>Password</h1>
//             {/* <input placeholder="teacher password" onChange = {(e) => {setPassword(e.target.value)}}></input> */}
//             <button onClick={handleEnter}>Press me</button>
//         </div>
//     )
// }

//////

import React, { useEffect, useState, useRef } from "react";

export default function TeacherLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [teacherId, setTeacherId] = useState("");
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && username != "" && password != "") {
      handleEnter();
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (inputRef.current && username == "" && password == "") {
      inputRef.current.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [username, password]);

  // useEffect(() => {
  //     if (loggedIn) {
  //         onLogin(teacherId);
  //     }
  // }, [loggedIn]);

  // const setLoginId = (id) => {
  //     setTeacherId(id);
  // }

  const handleEnter = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/teacher/${username}/${password}`
      );
      const p = await res.json();
      console.log(p[0]);
      onLogin(p[0].teacher_id);
      if (p.length > 0) {
        // setLoginId(p[0].teacher_id);
        setLoggedIn(true);
      } else {
        setErrorMessage("Invalid login!");
      }
      // console.log(p);
    } catch (err) {
      setErrorMessage("Invalid login!");
      console.error(err);
    }

    // if (loggedIn) {
    //     navigate(`/teacher/${p[0].teacher_id}`);
    // }
  };

  // const handleLogin = () => {
  //     console.log("Logging in...");
  //     Redirect("/teacher/:username/:password");
  // }

  return (
    <div style={{ zIndex: 10 }}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <h1>Username</h1>
      {/* <InputField/> */}
      <input
      ref={inputRef}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="inputField"
      ></input>
      <h1>Password</h1>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="inputField"
      ></input>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';

// export default function TeacherLogin({ onLogin }){
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [loggedIn, setLoggedIn] = useState(false);

//     const [teacherId, setTeacherId] = useState("");
//     // const handleKeyDown = (event) => {
//     //     if(event.keyCode === 13 && username != "" && password != ""){
//     //         console.log("submit");
//     //     }
//     // }

//     // useEffect(() => {
//     //     window.addEventListener('keydown', handleKeyDown);

//     //     return () => {
//     //         window.removeEventListener('keydown', handleKeyDown);
//     //     }
//     // }, []);

//     // useEffect(() => {
//     //     if (loggedIn) {
//     //         onLogin(teacherId);
//     //     }
//     // }, [loggedIn]);

//     // const setLoginId = (id) => {
//     //     setTeacherId(id);
//     // }

//     const handleEnter = async () => {
//         try{
//             const res = await fetch(`http://localhost:5000/api/teacher/${username}/${password}`);
//             const p = await res.json();
//             console.log(p[0]);
//             onLogin(p[0].teacher_id);
//             if(p.length > 0){
//                 // setLoginId(p[0].teacher_id);
//                 setLoggedIn(true);
//             }
//             // console.log(p);
//         }catch(err){
//             console.error(err);
//         }

//         // if (loggedIn) {
//         //     navigate(`/teacher/${p[0].teacher_id}`);
//         // }
//     }

//     // const handleLogin = () => {
//     //     console.log("Logging in...");
//     //     Redirect("/teacher/:username/:password");
//     // }

//     return(
//         <div>
//             <h1>Username</h1>
//             {/* <InputField/> */}
//             <input placeholder="teacher username" onChange={(e) => {setUsername(e.target.value)}}></input>
//             <h1>Password</h1>
//             <input placeholder="teacher password" onChange = {(e) => {setPassword(e.target.value)}}></input>
//             <button onClick={handleEnter}>Press me</button>
//         </div>
//     )
// }
