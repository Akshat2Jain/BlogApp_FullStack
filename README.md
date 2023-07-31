# FullStack Blog Application 👋


## Deployment 🚀
This project is deployed on AWS EC2 to provide a live and accessible version. You can visit the deployed application by accessing the following URL: http://13.232.99.215:3000/

## Project Focus 🎯

The main focus of this project is to create the core functionality of the blogging platform. The emphasis is on implementing the backend logic, user authentication, blog creation, and commenting features. While the user interface is essential for basic functionality demonstration, it may not be fully optimized for responsiveness or polished in appearance.

## Table of Contents 📋

1. Introduction
2. Tech-Stack
3. Important Design Decisions
   - Frontend 
   - Backend 
4. Project Flow
5. Setup Instructions

## Project Overview

Welcome to the repository! This project is a blogging platform that allows users to create, view, and comment on blogs. Users need to register and log in to access the blog creation and commenting features. The frontend is built using React, utilizing various libraries such as react-router-dom, axios, Formik, Yup, Ant Design for icons and notifications, and react-loading-spinner for loading bars. On the backend, Express.js and Node.js are used to create the REST API. For security, bcrypt is employed for password encryption, jsonwebtoken for authentication and protecting routes, cors for cross-platform communication, and Sequelize as the ORM for querying the SQL database.

## Features 🚀

- User Registration 📝: Users can register with the application to create their accounts.
- User Login 🔒: Registered users can log in to access the blog creation and commenting functionality.
- Create Blog ✍️: Logged-in users can create and publish their blogs.
- View Blogs 👓: Users can view blogs created by other users.
- Commenting 💬: Logged-in users can post comments on blogs.
- Form Validation ✅: The frontend forms (login, register, and create blog) are validated using Yup.
- Loading Spinner ⏳: The UI displays a loading spinner during asynchronous operations.
- Authentication 🔐: Jsonwebtoken is used for secure authentication and authorization of users.

## Tech Stack 🛠️

### Frontend

- React
- React Router Dom
- Axios
- Formik
- Yup
- Ant Design (for icons and notifications)
- react-loading-spinner

### Backend

- Node.js
- Express.js
- Bcrypt (for password security)
- Jsonwebtoken (for authentication)
- Cors (for cross-platform communication)
- Sequelize (ORM for SQL database queries)
- SQL (as the database)


## Design Decisions

### Frontend Architecture

The frontend is built using React, following a component-based architecture. The project is organized into folders such as components, pages, helper Components are reusable UI elements, while pages represent different views of the application. Services handle HTTP requests using Axios, helper consists of the context that provide the state to every component

### Backend Architecture

The backend is developed with Express.js and Node.js. It follows the Model-View-Controller (MVC) pattern to separate concerns. The models folder defines the database models using Sequelize, and the routes folder sets up the API endpoints, middleware sets up the validate authentication for the user , config consists of the sql connection information.

### Authentication and Security

Authentication is implemented using jsonwebtoken (JWT). Upon successful login, the server generates a JWT token, which is used for subsequent authenticated requests. bcrypt is used to securely hash and compare passwords in the database.

## Project Flow

### User Registration and Login
- Users can register with the application by providing a unique username and password.
- Registered users can log in using their credentials.
- On successful login, the server issues a JWT token, which is stored in the client's local storage to authorize further requests.

### Blog Creation and Viewing

- Logged-in users can create and publish their blogs by filling out the blog creation form and submitting it to the server.
- Blogs created by users are stored in the database.
- Users can view blogs created by other users on the homepage.

### Commenting on Blogs

- Logged-in users can view blogs and post comments on them.
- Comments are stored in the database and associated with their respective blogs.

## Installation 📋

1. Clone the repository:

```
git clone https://github.com/Akshat2Jain/FullStack_Assignment.git

cd FullStack_Assignment

```
2. Navigate to frontend

```
cd client
npm install
npm start

```
3. Navigate to Backend

```
cd server
npm install
npm start
```
