import React, { Component } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      cognito_error: null,
      toggle_error: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(state => ({
      toggle_error: !state.toggle_error
    }));
  }

  handleForm = async e => {
    e.preventDefault();
    // var url = "http://localhost:8000/login";
    // var obj = { username: this.state.username, password: this.state.password };
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(obj),
    //   headers: { "Content-Type": "application/json" }
    // })
    //   .then(res => res.json())
    //   .catch(error => console.error("Error:", error))
    //   .then(response => {
    //     console.log("Success:", response);
    //     this.props.setLogin(response.user);
    //     localStorage.setItem("token", response.token);
    //     this.props.history.push("/home");
    //   });
    try {
      const userObject = await Auth.signIn(
        this.state.username,
        this.state.password
      );
      console.log(userObject);
      this.props.setLogin({
        username: userObject.username,
        name: userObject.attributes.name,
        email: userObject.attributes.email
      });
      this.props.history.push("/profile/edit");
    } catch (error) {
      if (error != null) {
        this.setState({
          cognito_error: error.message,
          toggle_error: true
        });
      }

      console.log(error);
    }
  };
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Login</h1>
              <div className="mt-4">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleInput}
                  placeholder="Super Duper Secret Password"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <Link
                  to="/forgotpassword"
                  className="hover:underline text-blue-500"
                >
                  Forgot Password
                </Link>
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                />
              </div>
              <div className="mt-4">
                {this.state.toggle_error ? (
                  <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong class="font-bold">
                      {this.state.cognito_error}
                    </strong>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                        class="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        onClick={this.handleToggle}
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
