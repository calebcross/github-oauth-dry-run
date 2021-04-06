import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";

class PrivateRoute extends React.Component {
  state = {
    isAuthenticating: true,
    isAuthenticated: false,
    user: null,
  };

  componentDidMount() {
    // Send an auth check request to the server.
    // Don't forget forget to set axios to send requests
    // withCredentials; it allows for cookies to be passed
    // to the backend.
    axios
      .get(`${API_URL}/auth/check`, { withCredentials: true })
      .then((res) => {
        console.log("check passed");
        this.setState({
          isAuthenticating: false,
          isAuthenticated: true,
          user: res.data,
        });
      })
      .catch(() => {
        console.log("check failed");
        this.setState({
          isAuthenticating: false,
          isAuthenticated: false,
        });
      });
  }

  // https://ui.dev/react-router-v5-protected-routes-authentication/
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          // While authenticating, don't show anything
          // alternatively this could be a loading indicator
          if (this.state.isAuthenticating) return null;
          return this.state.isAuthenticated ? (
            <Component user={this.state.user} {...props} />
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
  }
}

export default PrivateRoute;
