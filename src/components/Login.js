import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(username, password);
    if (data.access) {
      localStorage.setItem("access", data.access);
      onLogin();
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
