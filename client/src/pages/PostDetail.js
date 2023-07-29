import { message } from "antd";

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../helpers/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setpostDetail] = useState({});
  const [commentDetail, setCommentDetail] = useState([]);
  const [newComment, setNewCommet] = useState("");
  const { username } = useContext(AuthContext);
  // get blog details
  const getDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://13.232.99.215:8080/posts/byId/${id}`
      );
      setpostDetail(response.data);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  // get perticular blog comment
  const getComment = async () => {
    try {
      const res = await axios.get(`http://13.232.99.215:8080/comments/${id}`);
      setCommentDetail(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Add comment funtion
  const createComment = async () => {
    try {
      if (!newComment) {
        message.error("Comment Can not be empty");
      } else {
        const res = await axios.post(
          "http://13.232.99.215:8080/comments",
          {
            commentBody: newComment,
            PostId: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("token"),
            },
          }
        );
        if (res.data.success) {
          message.success("Comment Added");
          setNewCommet("");
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.comment.username,
          };
          setCommentDetail([...commentDetail, commentToAdd]);
        } else {
          message.error("Login to comment");
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Something went Wrong");
    }
  };

  // delete comment
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://13.232.99.215:8080/comments/${id}`,
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setCommentDetail(
          commentDetail.filter((val) => {
            return val.id !== id;
          })
        );
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails(id);
    getComment(id);
  }, [id]);
  return (
    <>
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title">{postDetail.title}</div>
            <div className="body">{postDetail.postDescription}</div>
            <div className="footer">{postDetail.username}</div>
          </div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input
              type="text"
              value={newComment}
              placeholder="Comment...."
              autoComplete="off"
              onChange={(e) => setNewCommet(e.target.value)}
            />
            <button onClick={createComment}>Add Comment</button>
          </div>
          <div className="listOfComments">
            {commentDetail.map((comment, key) => {
              return (
                <>
                  <div className="comment" key={key}>
                    {comment.commentBody}
                    <label className="author">By: {comment.username}</label>
                    {username === comment.username ? (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="delete"
                      >
                        Delete Comment
                      </button>
                    ) : null}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
