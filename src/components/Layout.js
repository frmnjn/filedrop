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
      Auth.signOut();
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
        <nav className="flex items-center justify-between flex-wrap bg-orange-500 p-3 sticky">
          <Link to="/">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <svg
                className="fill-current h-8 w-8 ml-3 mr-2"
                width="54"
                height="54"
                viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
              </svg>
              <span className="font-semibold text-xl tracking-tight">
                FileDrop
              </span>
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
