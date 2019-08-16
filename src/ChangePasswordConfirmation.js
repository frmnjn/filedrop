import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class ChangePasswordConfirmation extends Component {
  render() {
    return (
      <div>
        <h1>Your password has been changed!</h1>
        <p>
          click{" "}
          <span>
            <Link to="/login" className="hover:underline text-blue-500">
              here
            </Link>
          </span>{" "}
          to login.
        </p>
      </div>
    );
  }
}

export default ChangePasswordConfirmation;
