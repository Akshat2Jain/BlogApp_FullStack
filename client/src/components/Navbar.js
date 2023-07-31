import React, { useContext, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { message } from "antd";

const Navbar = () => {
  const { authState, setAuthState, username, setUsername } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState(false);
    setUsername("");
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
          <div className="loggedInContainer">
            <Link to="/myblog" className="myblog">
              My Blog
            </Link>
            <button onClick={handleLogout}>Logout</button>
            <h1>{username}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
