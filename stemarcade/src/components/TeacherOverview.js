// import {React, useState, useEffect} from 'react';
// import ArcadeOutline from "./ArcadeOutline";
// import './TeacherOverview.css';

// export default function TeacherOverview({teacherId}){

//     const [classList, setClassList] = useState([]);
//     const [assignmentList, setAssignmentList] = useState([]);

//     const [classId, setClassId] = useState("");
//     const [assignmentSelect, setAssignmentSelect] = useState("");

//     useEffect(() => {
//         if (teacherId === "") {
//             return;
//         }
//         console.log(teacherId);
//         fetch(`http://localhost:5000/api/class/${teacherId}`)
//         // fetch(`/api/class/${teacherId}`)

//         .then((res) => res.json())
//         .then((data) => {
//             setClassList(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//         console.log("fetching class list")
//     }, [])

//     useEffect(() => {
//         if (classId === "") {
//             return;
//         }
//         fetch(`http://localhost:5000/api/assignment/${classId}`)
//         // fetch(`/api/assignment/${classSelect}`)

//         .then((res) => res.json())
//         .then((data) => {
//             setAssignmentList(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }, [classId])


//     return(
//         <ArcadeOutline >
//             <div className = "screen">
//                 <h1>Teacher Dashboard</h1>
//                 <div className = "select-buttons">
//                     <div className = "select-package">
//                         <label>Class Select</label>
//                         <select
//                             className="teacher-select"
//                             value={classId}
//                             onChange={(e) => setClassId(e.target.value)}
//                             >
//                             <option value="">Please select a class</option>
//                             {classList.map((classItem) => (
//                                 <option key={classItem.class_id} value={classItem.class_id}>{classItem.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className = "select-package">
//                         <label>Assignment Select</label>
//                         <select className="teacher-select">
//                         </select>
//                     </div>
//                 </div>
//                 <div className="student-leaderboard">
//                     <h2>Student Leaderboard</h2>
//                     <table className="student-table">
//                         <tr>
//                             <th>Student</th>
//                             <th>Score</th>
//                             <th>Completed</th>
//                         </tr>
//                         <tr>
//                             <td>John Doe</td>
//                             <td>100</td>
//                             <td>Yes</td>
//                         </tr>
//                         <tr>
//                             <td>Jane Doe</td>
//                             <td>90</td>
//                             <td>Yes</td>
//                         </tr>
//                     </table>
//                 </div>


//             </div>
//         </ArcadeOutline>
//     )
// }

// import {React, useState, useEffect} from 'react';
// import ArcadeOutline from "./ArcadeOutline";
// import './TeacherOverview.css';

// export default function TeacherOverview({teacherId}){

//     const [classList, setClassList] = useState([]);
//     const [assignmentList, setAssignmentList] = useState([]);

//     const [classSelect, setClassSelect] = useState("");
//     const [assignmentSelect, setAssignmentSelect] = useState("");

//     const [studentList, setStudentList] = useState([])

//     useEffect(() => {
//         if (teacherId === "") {
//             return;
//         }
//         console.log(teacherId + " is the teacher id, now searching for classes with this teacher id");
//         fetch(`http://localhost:5000/api/class/${teacherId}`)
//         .then((res) => res.json())
//         .then((data) => {
//             setClassList(data);
//             console.log("here are the classes with this teacher id" + classList)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }, [teacherId])

//     useEffect(() => {
//         if (classSelect === "") {
//             return;
//         }
//         console.log(classSelect + " is the class id, now searching for assignments with this class id");
//         fetch(`http://localhost:5000/api/assignment/${classSelect}`)
//         .then((res) => res.json())
//         .then((data) => {
//             setAssignmentList(data);
//             console.log("here are the assignments with this class id" + assignmentList)

//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }, [classSelect, classList])

//     useEffect(() => {
//         if (assignmentSelect === "") {
//             return;
//         }

//         console.log(assignmentSelect + " is the assignment id, now searching for students with this assignment id");
//         fetch(`http://localhost:5000/api/assignment_student/${assignmentSelect}`)
//         .then((res) => res.json())
//         .then((data) => {
//             setStudentList(data);
//             console.log("here are the students with this class id" + studentList)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }, [assignmentSelect, assignmentList])


//     return(
//         <ArcadeOutline >
//             <div className = "screen">
//                 <h1>Teacher Dashboard</h1>
//                 <div className = "select-buttons">
//                     <div className = "select-package">
//                         <label>Class Select</label>
//                         <select
//                         className="teacher-select"
//                         value={classSelect}
//                         onChange={(e) => setClassSelect(e.target.value)}
//                         >
//                             <option value="">Please select a class</option>
//                             {classList.map((classItem) => (
//                                 <option value={classItem.class_id}>{classItem.class_name}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className = "select-package">
//                         <label>Assignment Select</label>
//                         <select className="teacher-select"
//                         value={assignmentSelect}
//                         onChange={(e) => setAssignmentSelect(e.target.value)}>
//                         <option value="">Please select an assignment</option>
//                             {assignmentList.length > 0 && assignmentList.map((assignment) => (
//                                 <option key={assignment.assignment_id} value={assignment.assignment_id}>{assignment.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="student-leaderboard">
//                     <h2>Student Leaderboard</h2>
//                     <table className="student-table">
//                         <thead>
//                             <tr>
//                                 <th>Student</th>
//                                 <th>Score</th>
//                                 <th>Completed</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {studentList.map((student) => (
//                                 <tr key={student.student_id}>
//                                     <td>{student.first_name + " " + student.last_name}</td>
//                                     <td>{student.score}</td>
//                                     <td>{student.progress > 40 ? 'Yes' : 'No'}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>


//             </div>
//         </ArcadeOutline>
//     )
// }

import React, { useState, useEffect } from 'react';
import ArcadeOutline from "./ArcadeOutline";
import './TeacherOverview.css';

export default function TeacherOverview({ teacherId }) {
    const [classList, setClassList] = useState([]);
    const [assignmentList, setAssignmentList] = useState([]);
    const [classSelect, setClassSelect] = useState("");
    const [assignmentSelect, setAssignmentSelect] = useState("");
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        console.log("teacherId",teacherId);
        // fetch(`http://localhost:5000/api/class/${teacherId}`)
        fetch(`http://localhost:5000/api/class/1`)
            .then((res) => res.json())
            .then((data) => {
                setClassList(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log("class",classSelect);
        // fetch(`http://localhost:5000/api/assignment/${classSelect}`)
        fetch(`http://localhost:5000/api/assignment/1`)
            .then((res) => res.json())
            .then((data) => {
                setAssignmentList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [classSelect, classList]);

    useEffect(() => {
        console.log("ass",assignmentSelect);
        if (assignmentSelect !== "") {
            // fetch(`http://localhost:5000/api/assignment_student/${assignmentSelect}`)
            fetch(`http://localhost:5000/api/assignment_student/1`)
                .then((res) => res.json())
                .then((data) => {
                    setStudentList(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [assignmentSelect]);

    return (
        // <ArcadeOutline >
            <div className="screen">
                <h1>Teacher Dashboard</h1>
                <div className="select-buttons">
                    <div className="select-package">
                        <label>Class Select</label>
                        <select
                            className="teacher-select"
                            value={classSelect}
                            onChange={(e) => setClassSelect(e.target.value)}
                        >
                            <option value="">Please select a class</option>
                            {classList.map((classItem) => (
                                <option key={classItem.class_id} value={classItem.class_id}>{classItem.class_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="select-package">
                        <label>Assignment Select</label>
                        <select
                            className="teacher-select"
                            value={assignmentSelect}
                            onChange={(e) => setAssignmentSelect(e.target.value)}
                        >
                            <option value="">Please select an assignment</option>
                            {assignmentList.map((assignment) => (
                                <option key={assignment.assignment_id} value={assignment.assignment_id}>{assignment.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="student-leaderboard">
                    <h2>Student Leaderboard</h2>
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Score</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student) => (
                                <tr key={student.student_id}>
                                    <td>{student.first_name + " " + student.last_name}</td>
                                    <td>{student.score}</td>
                                    <td>{student.completed ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        // </ArcadeOutline>
    );
}

