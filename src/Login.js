import React, { Component } from "react";
import { connect } from "react-redux";
import Error from "./components/Error";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleForm = e => {
    e.preventDefault();
    var url = "http://localhost:8000/login";
    var obj = { username: this.state.username, password: this.state.password };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log("Success:", response);
        this.props.setLogin(response.user);
        localStorage.setItem("token", response.token);
        this.props.history.push("/home");
      });
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
                <input
                  type="submit"
                  className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                />
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
