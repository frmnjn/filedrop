import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class ChangePasswordConfirmation extends Component {
  render() {
    return (
      // <div>
      //   <h1>Your password has been changed!</h1>
      //   <p>
      //     click{" "}
      //     <span>
      //       <Link to="/login" className="hover:underline text-blue-500">
      //         here
      //       </Link>
      //     </span>{" "}
      //     to login.
      //   </p>
      // </div>
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <div className="border border-gray-500">
            <div className="p-4">
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
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePasswordConfirmation;
