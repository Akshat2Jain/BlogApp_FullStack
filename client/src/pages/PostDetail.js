import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setpostDetail] = useState({});
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
  useEffect(() => {
    getDetails(id);
  }, []);
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
        <div className="rightSide">Comment Section</div>
      </div>
    </>
  );
};

export default PostDetail;
