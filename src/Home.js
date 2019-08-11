import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username, name: props.name
    }
  }

  render() {
    return (
      <div>
        Welcome, {this.state.name}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.user.name
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
