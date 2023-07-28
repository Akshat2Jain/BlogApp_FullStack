import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
            <Link to="/createpost">Create Blog</Link>
            <Link to="/">Home</Link>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
