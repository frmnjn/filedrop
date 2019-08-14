import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import DropLinkCard from "./components/DropLinkCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      username: props.username,
      name: props.name,
      droplinks: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    console.log("ownerId", this.state.id);
    console.log("token", localStorage.getItem("token"));
    var url = "http://localhost:8000/getdroplinks";
    var obj = {
      ownerId: this.state.id
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.setState({
          isLoaded: true,
          droplinks: response.droplinks
        });
        console.log(this.state.droplinks);
      });
  }

  render() {
    this.props.SET_USER(this.state);

    const spinner = (
      <div className="sweet-loading exact-center">
        <BeatLoader
          sizeUnit={"px"}
          size={30}
          color={"#38B2AC"}
          loading={this.state.isLoaded}
        />
        checking link ...
      </div>
    );

    const viewLoaded = (
      <div>
        <div class="text-gray-700 text-center bg-white rounded px-4 py-2">
          Your Drop Link
        </div>
        <div class="w-full h-12 p-6">
          {this.state.droplinks.map(function(droplink) {
            return <DropLinkCard name={droplink.name} />;
          })}
        </div>
      </div>
    );

    return (
      <div class="flex flex-col mb-4 w-full">
        {this.state.isLoaded ? viewLoaded : spinner}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.user.id,
    name: state.auth.user.name,
    username: state.auth.user.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SET_USER: user => dispatch({ type: "SET_USER", payload: user })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
