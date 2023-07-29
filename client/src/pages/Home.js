import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listofPosts, setlistofPosts] = useState([]);
  const navigate = useNavigate();
  const getPosts = async () => {
    try {
      const response = await axios.get("http://13.232.99.215:8080/posts");
      // console.log(response);
      setlistofPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="App">
        <h1>List of Blogs</h1>
        {listofPosts.map((post, key) => {
          return (
            <>
              <div
                key={key}
                className="post"
                onClick={() => {
                  navigate(`/post/${post.id}`);
                }}
              >
                <div className="title">{post.title}</div>
                <div className="body">{post.postDescription}</div>
                <div className="footer">{post.username}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
