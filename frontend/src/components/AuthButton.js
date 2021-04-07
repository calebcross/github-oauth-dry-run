import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../App";

const AuthButton = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check auth
    axios
      .get(`${API_URL}/auth/check`, { withCredentials: true })
      .then((res) => {
        setAuthenticated(true);
        setUser(res.data);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  const signOut = () => {
    // Change location to /logout server route while passing it
    // the URL for redirecting back to a client
    const url = `${window.location.protocol}//${window.location.host}`;
    window.location = `${API_URL}/logout?from=${url}`;
  };

  return (
    isAuthenticated &&
    user && (
      <p>
        <img height="25" src={user.photos[0].value} alt={user.displayName} />
        Welcome, {user.displayName}! <button onClick={signOut}>Sign out</button>
      </p>
    )
  );
};

export default AuthButton;
