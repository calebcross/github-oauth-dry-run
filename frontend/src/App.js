import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicPage from "./components/PublicPage";
import ProtectedPage from "./components/ProtectedPage";
import LoginPage from "./components/LoginPage";
import AuthButton from "./components/AuthButton";

export const API_URL = "http://localhost:5000";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/login" component={LoginPage} />
        <Route path="/public" component={PublicPage} />
        <PrivateRoute path="/protected" component={ProtectedPage} />
      </div>
    </Router>
  );
};

export default App;
