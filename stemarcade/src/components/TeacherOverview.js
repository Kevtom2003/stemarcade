import {React, useState, useEffect} from 'react';
import ArcadeOutline from "./ArcadeOutline";
import './TeacherOverview.css';

export default function TeacherOverview({teacherLogin}){

    const [classList, setClassList] = useState(['Nothing here yet']);
    const [assignmentList, setAssignmentList] = useState(['Nothing here yet']);

    const [classSelect, setClassSelect] = useState("");
    const [assignmentSelect, setAssignmentSelect] = useState("");

    useEffect(() => {
        fetch(`http:localhost:5000/api/class/${teacherLogin}`)
        .then((res) => res.json())
        .then((data) => {
            setClassList(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    useEffect(() => {
        fetch(`http:localhost:5000/api/assignment/${classSelect}`)
        .then((res) => res.json())
        .then((data) => {
            setAssignmentList(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [classSelect])


    return(
        <ArcadeOutline >
            <div className = "screen">
                <h1>Teacher Dashboard</h1>
                <div className = "select-buttons">
                    <div className = "select-package">
                        <label>Class Select</label>
                        <select className="teacher-select">
                            {classList.map((classItem) => (
                                <option value={classItem.class_id}>{classItem.class_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className = "select-package">
                        <label>Assignment Select</label>
                        <select className="teacher-select">
                        </select>
                    </div>
                </div>
                <div className="student-leaderboard">
                    <h2>Student Leaderboard</h2>
                    <table className="student-table">
                        <tr>
                            <th>Student</th>
                            <th>Score</th>
                            <th>Completed</th>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>100</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>Jane Doe</td>
                            <td>90</td>
                            <td>Yes</td>
                        </tr>
                    </table>
                </div>


            </div>
        </ArcadeOutline>
    )
}
