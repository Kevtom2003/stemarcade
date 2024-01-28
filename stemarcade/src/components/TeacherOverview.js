import React, { useState, useEffect } from "react";
import ArcadeOutline from "./ArcadeOutline";
import "./TeacherOverview.css";
import TeacherCreate from "./TeacherCreate";
import TeacherUpdate from "./TeacherUpdate";

export default function TeacherOverview({ teacherId }) {
  const [currView, setCurrView] = useState("View");

  const [classList, setClassList] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);
  const [classSelect, setClassSelect] = useState("");
  const [assignmentSelect, setAssignmentSelect] = useState("");
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    console.log("teacherId", teacherId);
    fetch(`http://localhost:5000/api/class/${teacherId}`)
      // fetch(`http://localhost:5000/api/class/1`)
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
    console.log("class", classSelect);
    fetch(`http://localhost:5000/api/assignment/${classSelect}`)
      // fetch(`http://localhost:5000/api/assignment/1`)
      .then((res) => res.json())
      .then((data) => {
        setAssignmentList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [classSelect, classList]);

  useEffect(() => {
    console.log("ass", assignmentSelect);
    if (assignmentSelect !== "") {
      fetch(`http://localhost:5000/api/assignment_student/${assignmentSelect}`)
        // fetch(`http://localhost:5000/api/assignment_student/1`)
        .then((res) => res.json())
        .then((data) => {
          setStudentList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [assignmentSelect]);

  function getCuriosityScore() {
    const curiosityScore = Math.floor(Math.random() * 3) + 1;
    let label;
    switch (curiosityScore) {
      case 1:
        label = 'Low';
        break;
      case 2:
        label = 'Medium';
        break;
      case 3:
        label = 'High';
        break;
      default:
        label = 'unknown';
    }
    return label;
  }

  function getColorForCuriosityScore(curiosityScore) {
    if (curiosityScore === "Low") {
      return "red";
    } else if (curiosityScore === "Medium") {
      return "yellow";
    } else {
      return "green";
    }
  }

  return (
    <div className="screen">
      <div className="teacher-options">
        <h3 onClick={() => setCurrView("View")}>View</h3>
        <h3 onClick={() => setCurrView("Create")}>Create</h3>
        <h1>Teacher Dashboard</h1>
        <h3 onClick={() => setCurrView("Update")}>Update</h3>
        <h3 onClick={() => setCurrView("Delete")}>Delete</h3>
      </div>
      {currView === "View" && (
        <div>
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
                  <option key={classItem.class_id} value={classItem.class_id}>
                    {classItem.class_name}
                  </option>
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
                  <option
                    key={assignment.assignment_id}
                    value={assignment.assignment_id}
                  >
                    {assignment.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <div className="student-leaderboard">
                        <h2>Student Leaderboard</h2>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Score</th>
                                    <th>Completed</th>
                                    <th>Attempted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((student) => (
                                    <tr key={student.student_id}>
                                        <td>{student.first_name + " " + student.last_name}</td>
                                        <td>{student.score}</td>
                                        <td>{student.score >= 30 ? 'Yes' : 'No'}</td>
                                        <td>{student.progress === 1 ? 'Yes' : 'No' }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
          <div className="student-leaderboard">
            <h2>Student Scores</h2>
            <div className="table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Score</th>
                    <th>Completed</th>
                    <th>Attempted</th>
                    <th>Curiosity Score</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student) => (
                    <tr key={student.student_id}>
                      <td>{student.first_name + " " + student.last_name}</td>
                      <td>{student.score}</td>
                      <td style={{ color: student.score >= 30 ? "green" : "red" }}>{student.score >= 30 ? "Yes" : "No"}</td>
                      <td style={{ color: student.progress === 1 ? "green" : "red" }}>{student.progress === 1 ? "Yes" : "No"}</td>
                      <td>{getCuriosityScore()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {currView === "Create" && (
        <div>
          <TeacherCreate classes={classList} />
        </div>
      )}
      {currView === "Update" && (
        <div>
          <TeacherUpdate teacherId={teacherId} />
        </div>
      )}
    </div>
  );
}
