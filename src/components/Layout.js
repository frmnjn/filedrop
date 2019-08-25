import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  handleLogout = async e => {
    e.preventDefault();
    try {
      await Auth.signOut();
      this.props.logout();
      this.props.SET_USER(null);
      this.props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return (
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-yellow-500 p-3 sticky">
          <Link to="/">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <img
                className="h-15 w-20"
                src="https://d1u37cwdvjwb8j.cloudfront.net/FILEDROP2.png"
              />
              {/* <span className="font-semibold text-xl tracking-tight">
                FileDrop
              </span> */}
            </div>
          </Link>
          <div className="flex justify-between">
            {!this.props.loggedIn ? (
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-md lg:flex-grow">
                  <Link
                    to="/login"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 mr-4"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-md lg:flex-grow">
                  <Link
                    to="/home"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 mr-4"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/createdroplink"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 mr-4"
                  >
                    Create Drop Link
                  </Link>
                  <Link
                    to="/profile/edit"
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 mr-4"
                  >
                    Account
                  </Link>
                  <Link
                    to="/logout"
                    onClick={this.handleLogout}
                    className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-400 mr-4"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" }),
    SET_USER: user => dispatch({ type: "SET_USER", payload: user })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
