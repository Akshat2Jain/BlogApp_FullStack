import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import "../App.css";
import { AuthContext } from "../helpers/AuthContext";

const CreatePost = () => {
  const initialValues = {
    title: "",
    postDescription: "",
    username: "",
  };

  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().strict().required("Title can be empty"),
    postDescription: Yup.string().required("Description can be empty"),
    username: Yup.string().min(3).max(15).required("Name can be empty"),
  });

  const addPost = async (data) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await axios.post("http://13.232.99.215:8080/posts", data, {
        headers: {
          accessToken: localStorage.getItem("token"),
        },
      });
      setLoading(false);
      if (!res.data.success) {
        message.error("Log in to Create Blog");
      } else {
        message.success("Post Created");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const onSubmit = (data, { resetForm }) => {
    resetForm({
      initialValues: {
        title: "",
        postDescription: "",
        username: "",
      },
    });
    addPost(data);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="createPostPage">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="formContainer">
                <label>Title:</label>

                <Field id="inputCreatePost" name="title" placeholder="Title" />
                <ErrorMessage name="title" component="p" />
                <label>Blog Description:</label>

                <Field
                  id="inputCreatePost"
                  name="postDescription"
                  placeholder="Title"
                />
                <ErrorMessage name="postDescription" component="p" />
                <label>Author:</label>

                <Field
                  id="inputCreatePost"
                  name="username"
                  placeholder="Title"
                />
                <ErrorMessage name="username" component="p" />
                <button type="submit">Create Blog</button>
              </Form>
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePost;
