import React, { useState } from "react";
import "./TeacherOverview.css";

export default function TeacherCreate({classes}) {
  const [create, setCreate] = useState("Student");

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
              <input type="text" name="first_name" />
            </div>
            <div className="teacher-inputs">
              <label>Last Name</label>
              <input type="text" name="last_name" />
            </div>
            <div className="teacher-inputs">
              <label>Class</label>
              <select>
                {classes.map((classItem) => (
                  <option key={classItem.class_id} value={classItem.class_id}>
                    {classItem.class_name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
