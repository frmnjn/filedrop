import React from "react";
import "./css/tailwind.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Drop from "./Drop";
import Register from "./Register";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-gray-300 h-screen">
          <Route exact path='/' component={Drop} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <AuthRoute path="/profile" component={Profile} />
          <AuthRoute path="/home" component={Home} />
        </div>
      </Layout>
    </Router>
  );
}

export default App;
