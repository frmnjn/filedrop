import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

class EditAkun extends Component {
  constructor(props) {
    super(props);
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
      <div class="flex px-4 py-4 w-full">
        <Link to="/">
          <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg mr-2">
            <div className="px-6 py-4 bg-white hover:bg-orange-200">
              <div className="font-bold text-xl mb-2">Edit Account</div>
            </div>
          </div>
        </Link>
        <Link to="/changepassword">
          <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg mr-2">
            <div className="px-6 py-4 bg-white hover:bg-orange-200">
              <div className="font-bold text-xl mb-2">Change Password</div>
            </div>
          </div>
        </Link>
        <Link to="/" onClick={this.handleLogout}>
          <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg mr-2">
            <div className="px-6 py-4 bg-white hover:bg-orange-200">
              <div className="font-bold text-xl mb-2">Log Out</div>
            </div>
          </div>
        </Link>
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
)(EditAkun);
