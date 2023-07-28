import React, { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./helpers/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  const [authState, setAuthState] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AuthContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
