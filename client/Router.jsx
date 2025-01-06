/* eslint-disable no-unused-vars */
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignUp from "./SignUp";
import App from "./src/App";
import About from "./src/components/About";
import Dashboard from "./src/components/admin/Dashboard";
import Login from "./Login";
import useStore from "./src/components/Store";

const RouterComponent = () => {
  const { isLoggedIn } = useStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <App /> : <Navigate to="/login" replace />,
    },
    {
      path: "/dashboard",
      element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <h1>Page not found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
