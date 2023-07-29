import React, { useContext, useLayoutEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Loading from "../components/Loading";
const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const { setAuthState, setUsername, loading, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("username can be empty"),
    password: Yup.string().min(3).max(15).required("password can be empty"),
  });
  const getLoginData = async (data) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await axios.post(
        "http://13.232.99.215:8080/auth/login",
        data
      );
      setLoading(false);
      if (!res.data.success) {
        message.error(res.data.message);
      } else if (res.data.success) {
        localStorage.setItem("token", res.data.accessToken);
        message.success("Welcome " + res.data.username);
        setAuthState(true);
        setUsername(res.data.username);

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
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Login;
