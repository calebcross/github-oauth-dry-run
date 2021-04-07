import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Send an auth check request to the server.
    // Don't forget forget to set axios to send requests
    // withCredentials; it allows for cookies to be passed
    // to the backend.
    axios
      .get(`${API_URL}/auth/check`, { withCredentials: true })
      .then((res) => {
        console.log("check passed");
        // the order absolutely matters here. Don't forget that
        // every time a state gets changed, it rerenders.
        setUser(res.data);
        setAuthenticated(true);
        setAuthenticating(false);
      })
      .catch(() => {
        console.log("check failed");
        setAuthenticating(false);
        setAuthenticated(false);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("route render props", props);
        console.log(isAuthenticating);
        console.log(isAuthenticated);
        // While authenticating, don't show anything
        // alternatively this could be a loading indicator
        if (isAuthenticating) return null;
        return isAuthenticated ? (
          <Component user={user} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
