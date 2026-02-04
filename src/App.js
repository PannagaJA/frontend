import { useEffect, useState } from "react";
import Login from "./components/Login";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { getStudents } from "./services/api";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setIsLoggedIn(false);
      setStudents([]);
      return;
    }

    const data = await getStudents(token);

    if (!data) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("access");
      setIsLoggedIn(false);
      setStudents([]);
      return;
    }

    setStudents(data);
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      setIsLoggedIn(true);
      fetchStudents();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    setIsLoggedIn(false);
  };

  return (
    
  <div style={{ padding: "40px" }}>
    <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <Login
              onLogin={() => {
                setIsLoggedIn(true);
                fetchStudents();
              }}
            />
          ) : (
            <Navigate to="/students" />
          )
        }
      />

      {/* Protected route */}
      <Route
        path="/students"
        element={
          isLoggedIn ? (
            <>
              <StudentForm onAdd={fetchStudents} />
              <StudentList students={students} onDelete={fetchStudents} />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Default route */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/students" : "/login"} />}
      />
    </Routes>
  </div>
);

}

export default App;
