import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import "./App.css";

class ChangePasswordConfirmation extends Component {
  async handleChangePassword(e) {
    e.preventDefault();
    try {
      await Auth.signOut();
      this.props.logout();
      this.props.SET_USER(null);
      this.props.history.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  }
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
                  <Link
                    onClick={e => this.handleChangePassword(e)}
                    className="hover:underline text-blue-500"
                  >
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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" }),
    SET_USER: user => dispatch({ type: "SET_USER", payload: user })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChangePasswordConfirmation);
