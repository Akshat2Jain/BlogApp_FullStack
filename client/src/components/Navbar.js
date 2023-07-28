import React, { useContext, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { message } from "antd";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState(false);
    message.success("Successfully Logout");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthState(true);
    }
  }, []);
  return (
    <div className="navbar">
      <Link to="/createpost">Create Blog</Link>
      <Link to="/">Home</Link>
      {!authState ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
