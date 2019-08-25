import React, { Component } from "react";
import { connect } from "react-redux";
import "./css/tailwind.css";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Auth } from "aws-amplify";
import Home from "./Home";
import Login from "./Login";
import EditAkun from "./EditAkun";
import Drop from "./Drop";
import ListFiles from "./ListFiles";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import ChangePasswordConfirmation from "./ChangePasswordConfirmation";
import ForgotPasswordVerification from "./ForgotPasswordVerification";
import Welcome from "./Welcome";
import CreateDropLink from "./CreateDropLink";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";
import DropZone from "./components/DropZone";
import DropCopy from "./DropCopy";

class App extends Component {
  state = {
    isAuthenticating: true
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.props.setLogin();
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.props.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({
      isAuthenticating: false
    });
  }

  render() {
    const index = () => (
      <div className="bg-grey-300">
        <div>
          <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
            <div className="xl:max-w-lg xl:ml-auto">
              {/* <img
                className="h-10"
                src={require("./assets/img/logo-blue.svg")}
                alt="Workcation"
              /> */}
              <div className="h-5">
                <img
                  className="h-15 w-20"
                  src="https://d1u37cwdvjwb8j.cloudfront.net/FILEDROP2.png"
                />
                {/* <span className="font-semibold text-xl tracking-tight">
                  FileDrop
                </span> */}
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                You can collect or drop your files easily.
                <br className="hidden lg:inline" />
                <span className="text-blue-500" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
                FileDrop is a cloud based file collection platform to help you
                collect files from anyone in the world.
              </p>
              <div className="mt-4 sm:mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link to="/login">Create a DropLink</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      !this.state.isAuthenticating && (
        <Router>
          <div className="bg-gray-300 h-screen">
            <Layout />
            <Route exact path="/" component={index} />
            <Route exact path="/welcome" component={Welcome} />
            {/* <GuestRoute path="/drop" component={Drop} /> */}
            {/* <Route exact path="/drop/:username/:droplink" component={Drop} /> */}
            <GuestRoute exact path="/login" component={Login} />
            <GuestRoute exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route
              exact
              path="/forgotpasswordverification"
              component={ForgotPasswordVerification}
            />
            <Route
              exact
              path="/changepasswordconfirmation"
              component={ChangePasswordConfirmation}
            />
            <Route
              exact
              path="/drop/:username/:droplink"
              component={DropZone}
            />
            <Route exact path="/dropcopy" component={DropCopy} />
            <AuthRoute exact path="/profile/edit" component={EditAkun} />
            <AuthRoute exact path="/home" component={Home} />
            <AuthRoute
              exact
              path="/createdroplink"
              component={CreateDropLink}
            />
            <AuthRoute
              exact
              path="/:username/files/:folder"
              component={ListFiles}
            />
          </div>
          {/* </Layout> */}
        </Router>
      )
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user => dispatch({ type: "SET_LOGIN", payload: user }),
    setUser: user => dispatch({ type: "SET_USER", payload: user })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
