import { useState } from "react";
import { createStudent } from "../services/api";

function StudentForm({ onAdd }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
  });

  const addStudent = async () => {
    const token = localStorage.getItem("access");

    await createStudent(student, token);

    // clear form after submit
    setStudent({ name: "", email: "", age: "" });

    // tell parent (App.js) to refresh list
    onAdd();
  };

  return (
    <div>
      <h3>Add Student</h3>

      <input
        placeholder="Name"
        value={student.name}
        onChange={(e) =>
          setStudent({ ...student, name: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="Email"
        value={student.email}
        onChange={(e) =>
          setStudent({ ...student, email: e.target.value })
        }
      />
      <br /><br />

      <input
        placeholder="Age"
        value={student.age}
        onChange={(e) =>
          setStudent({ ...student, age: e.target.value })
        }
      />
      <br /><br />

      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}

export default StudentForm;
