import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("username can be empty"),
    password: Yup.string().min(3).max(15).required("password can be empty"),
  });

  const getRegisterData = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/auth", data);
      if (!res.data.success) {
        message.error(res.data.message);
      } else if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
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
    getRegisterData(data);
  };
  return (
    <>
      <h2>Register Form </h2>
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
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
