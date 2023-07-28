import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("username can be empty"),
    password: Yup.string().min(3).max(15).required("password can be empty"),
  });
  const getLoginData = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);

      if (!res.data.success) {
        message.error(res.data.message);
      } else if (res.data.success) {
        localStorage.setItem("token", res.data.accessToken);
        message.success(res.data.message);
        setAuthState(true);
        navigate("/");
      } else {
        message.error("Some thing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data, { resetForm }) => {
    resetForm({
      initialValues: {
        username: "",
        password: "",
      },
    });
    getLoginData(data);
  };
  return (
    <>
      <h2>Login Form </h2>
      <div className="createPostPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Username</label>

            <Field
              id="inputCreatePost"
              name="username"
              placeholder="username"
            />
            <ErrorMessage name="username" component="p" />
            <label>Password:</label>

            <Field
              id="inputCreatePost"
              name="password"
              placeholder="password"
            />
            <ErrorMessage name="password" component="p" />
            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;