import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import DropLinkCard from "./components/DropLinkCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      ownerUsername: props.username,
      email: props.email,
      name: props.name,
      droplinks: [],
      isLoading: false
    };
  }

  componentDidMount() {
    // console.log("ownerId", this.state.id);
    // console.log("token", localStorage.getItem("token"));
    var url = "http://localhost:8000/getdroplinks";
    var obj = {
      ownerUsername: this.state.ownerUsername
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
          isLoading: true,
          droplinks: response.droplinks
        });
        console.log(this.state.droplinks);
      });
  }

  render() {
    var droplinks = this.state.droplinks;
    var ownerUsername = this.state.ownerUsername;

    const spinner = (
      <div className="sweet-loading exact-center">
        <BeatLoader
          sizeUnit={"px"}
          size={30}
          color={"#38B2AC"}
          loading={this.state.isLoading}
        />
        Loading files ...
      </div>
    );

    const viewLoaded = (
      <div className="">
        <div class="text-black text-center bg-teal-500 px-4 py-2 font-bold text-xl">
          Your DropLinks
        </div>
        <div class="w-full h-12 p-6">
          {droplinks.map(function(droplink) {
            return (
              <DropLinkCard name={droplink.name} username={ownerUsername} />
            );
          })}
        </div>
      </div>
    );

    return (
      <div class="flex flex-col mb-4 w-full">
        {this.state.isLoading ? viewLoaded : spinner}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.user.name,
    username: state.auth.user.username,
    email: state.auth.user.email
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
