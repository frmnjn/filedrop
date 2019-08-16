import React, { Component } from "react";
import { Link } from "react-router-dom";

class DropLinkCard extends Component {
  render() {
    var url = this.props.username + "/files/" + this.props.name;
    return (
      <Link to={url}>
        <div class="inline-block max-w-sm rounded overflow-hidden shadow-lg mr-2">
          <div class="px-6 py-4 bg-white">
            <div class="font-bold text-xl mb-2">{this.props.name}</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default DropLinkCard;