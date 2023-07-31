import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./helpers/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import PageNotFound from "./components/PageNotFound";
import MyBlog from "./pages/MyBlog";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  const [authState, setAuthState] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        "http://13.232.99.215:8080/auth/getUserInfo",
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );
      setUsername(res.data.username);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <AuthContext.Provider
            value={{
              authState,
              setAuthState,
              username,
              setUsername,
              loading,
              setLoading,
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route
                path="/login"
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute>
                    <Register />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/myblog"
                element={
                  <PublicRoute>
                    <MyBlog />
                  </PublicRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
