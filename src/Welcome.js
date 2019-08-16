import React, { Component } from "react";
import "./App.css";

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>Please check your email to verify account.</p>
      </div>
    );
  }
}

export default Welcome;
