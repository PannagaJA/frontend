import { useState } from "react";
import { deleteStudent, updateStudent } from "../services/api";

function StudentList({ students, onDelete }) {
  const token = localStorage.getItem("access");

  const [editingId, setEditingId] = useState(null);
  const [editStudent, setEditStudent] = useState({
    name: "",
    email: "",
    age: "",
  });

  if (!Array.isArray(students)) {
    return null;
  }

  const saveEdit = async (id) => {
    await updateStudent(id, editStudent, token);
    setEditingId(null);
    onDelete(); // refresh list
  };

  return (
    <div>
      <h3>Student List</h3>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {editingId === s.id ? (
              <>
                <input
                  value={editStudent.name}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, name: e.target.value })
                  }
                />
                <input
                  value={editStudent.email}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, email: e.target.value })
                  }
                />
                <input
                  value={editStudent.age}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, age: e.target.value })
                  }
                />

                <button onClick={() => saveEdit(s.id)}>💾</button>
              </>
            ) : (
              <>
                {s.name} | {s.email} | {s.age}
                <button
                  onClick={() => {
                    setEditingId(s.id);
                    setEditStudent({
                      name: s.name,
                      email: s.email,
                      age: s.age,
                    });
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() =>
                    deleteStudent(s.id, token).then(onDelete)
                  }
                >
                  ❌
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
