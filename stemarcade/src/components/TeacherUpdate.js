import React, { useState, useEffect } from "react";
import "./TeacherOverview.css";

export default function TeacherUpdate({teacherId}) {

    const [data, setData] = useState({});
  
    useEffect(() => {
        console.log("teacherId",teacherId);
        fetch(`http://localhost:5000/api/teacher/${teacherId}`)
        // fetch(`http://localhost:5000/api/class/1`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

  return (
    <div>
      <div className="update-header">
        <h2>Update Profile</h2>
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
              <input type="text" name="first_name" />
            </div>
            <div className="teacher-inputs">
              <label>Last Name</label>
              <input type="text" name="last_name" />
            </div>
            <div className="teacher-inputs">
              <label>Class</label>
              <select>
              </select>
            </div>

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}