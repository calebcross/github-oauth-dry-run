import React from "react";
import { API_URL } from "../App";

const Login = (props) => {
  const login = () => {
    // Change location to /login server route while sending a redirect url
    // If user is coming from a page different than /, get the page they
    // are coming from, otherwise redirect to / after login
    const { from } = props.location.state || { from: { pathname: "/" } };
    const url = `${window.location.protocol}//${window.location.host}${from.pathname}`;
    window.location = `${API_URL}/login/?from=${url}`;
  };

  return (
    <div>
      <p>You must login to view the page.</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Login;
