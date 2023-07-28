import { message } from "antd";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setpostDetail] = useState({});
  const [commentDetail, setCommentDetail] = useState([]);
  const [newComment, setNewCommet] = useState("");
  // get blog details
  const getDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/posts/byId/${id}`
      );
      setpostDetail(response.data);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  // get blog comment
  const getComment = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/comments/${id}`);
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
        await axios.post("http://localhost:8080/comments", {
          commentBody: newComment,
          PostId: id,
        });
        message.success("Comment Added");
        setNewCommet("");
        const commentToAdd = { commentBody: newComment };
        setCommentDetail([...commentDetail, commentToAdd]);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went Wrong");
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
