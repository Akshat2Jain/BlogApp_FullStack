import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "../App.css";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  const getMyBlogs = async () => {
    try {
      const response = await axios.get("http://13.232.99.215:8080/posts");
      setMyBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <>
      {/* {myBlogs.map((blog, key) => {
        return <h1>{blog.title}</h1>;
      })} */}
      {myBlogs
        .filter((blog) => {
          if (blog.username === username) {
            return blog;
          }
        })
        .map((blog, key) => {
          return (
            <>
              <div className="App">
                <h1>Your Blogs</h1>
                <div
                  className="post"
                  onClick={() => {
                    navigate(`/post/${blog.id}`);
                  }}
                >
                  <div className="title">{blog.title}</div>
                  <div className="body">{blog.postDescription}</div>
                  <div className="footer">{blog.username}</div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default MyBlog;
