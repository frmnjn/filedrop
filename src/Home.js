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
    var url =
      "https://mfb5knaaei.execute-api.ap-southeast-1.amazonaws.com/api/getdroplinks";
    var obj = {
      body: {
        ownerUsername: this.state.ownerUsername
      }
    };

    fetch(url, {
      method: "POST",
      // mode: "no-cors",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log(response);
        this.setState({
          isLoading: true,
          droplinks: response.body.data.Items
        });
        console.log(this.state.droplinks);
      });
  }

  render() {
    var droplinks = [],
      ownerUsername = null;
    if (this.state.droplinks && this.state.ownerUsername) {
      droplinks = this.state.droplinks;
      ownerUsername = this.state.ownerUsername;
    }

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
        <div class="text-black px-4 py-2 font-bold text-xl">Your DropLinks</div>
        <div class="w-full h-12 p-6">
          {droplinks.map(function(droplink) {
            return (
              <DropLinkCard
                name={droplink.droplinkName}
                username={droplink.ownerUsername}
                id={droplink.droplinkId}
              />
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
    SET_USER: user => dispatch({ type: "SET_USER", payload: user }),
    SET_ACTIVE_DROPLINK: droplink =>
      dispatch({ type: "SET_ACTIVE_DROPLINK", payload: droplink })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
