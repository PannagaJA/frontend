import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {isLoggedIn && (
        <>
          <Link to="/students">Students</Link>{" "}
          <Link to="/about">About</Link>{" "}
          <button onClick={onLogout}>Logout</button>
        </>
      )}
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </div>
  );
}

export default Navbar;
