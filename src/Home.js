import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      username: props.username,
      name: props.name
    };
  }

  render() {
    this.props.SET_USER(this.state);
    return (
      <div class="flex flex-col mb-4 w-full">
        <div class="text-gray-700 text-center bg-white rounded px-4 py-2 m-2">
          Your Drop Link
        </div>
        <div class="w-full h-12 p-6">
          <div class="inline-block max-w-sm rounded overflow-hidden shadow-lg mr-2">
            <div class="px-6 py-4 bg-white">
              <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div class="px-6 py-4">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #photography
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #travel
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                #winter
              </span>
            </div>
          </div>
          <div class="inline-block max-w-sm rounded overflow-hidden shadow-lg mr-2">
            <div class="px-6 py-4 bg-white">
              <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div class="px-6 py-4">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #photography
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #travel
              </span>
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                #winter
              </span>
            </div>
          </div>
        </div>
      </div>

      // <div className="flex">
      //   <div className="w-1/3" />
      //   <div className="w-1/3 mt-10 p-4 bg-white">
      //     <h1 className="justify-center content-center self-center items-center">
      //       Welcome, {this.state.name}
      //     </h1>
      //     <button class="p-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded content-center justify-center self-center items-center">
      //       <Link to="/createdroplink">Create Drop Link</Link>
      //     </button>
      //   </div>
      // </div>
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
