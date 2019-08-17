import React, { Component } from "react";
import { Link } from "react-router-dom";

class DropLinkCard extends Component {
  render() {
    var url = this.props.username + "/files/" + this.props.name;
    return (
      <Link to={url}>
        <div className="inline-block max-w-sm rounded overflow-hidden shadow-lg mr-2">
          <div className="px-6 py-4 bg-white hover:bg-orange-200">
            <div className="font-bold text-xl mb-2">{this.props.name}</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla!
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default DropLinkCard;
