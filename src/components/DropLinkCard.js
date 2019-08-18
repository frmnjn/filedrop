import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class DropLinkCard extends Component {
  submit = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure want to delete this droplink?",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            e.preventDefault();
            console.log("canceled");
          }
        },
        {
          label: "Yes",
          onClick: () => {
            e.preventDefault();
            this.deleteDroplink(e, id);
          }
        }
      ]
    });
  };

  confirm = error => {
    confirmAlert({
      title: "Delete Status",
      message: error,
      buttons: [
        {
          label: "OK",
          onClick: () => {}
        }
      ]
    });
  };

  deleteDroplink = (e, id) => {
    var message;
    e.preventDefault();
    console.log(id);
    var url = "http://localhost:8000/deletedroplink";
    var obj = {
      id: id,
      ownerUsername: this.props.username,
      dropLinkName: this.props.name
    };

    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        message = response.message;
        this.confirm(message);
        console.log(response);
      });
  };

  render() {
    var url = this.props.username + "/files/" + this.props.name;
    return (
      <div className="inline-block max-w-sm rounded overflow-hidden shadow-lg mr-2">
        <div className="px-6 py-4 bg-white">
          <div>
            <div className="inline-block font-bold text-xl mb-2">
              {this.props.name}
            </div>
            <div className="flex inline-block text-md mb-2">
              <p className="w-screen">Description Here...</p>
            </div>
          </div>
          <div className="flex inline-block text-md mb-2">
            <div className="w-1/3" />
            <Link
              to={url}
              class="w-1/3 mr-2 bg-transparent hover:bg-green-500 text-green-700
              font-semibold hover:text-white py-2 border border-green-500
              hover:border-transparent rounded text-center"
            >
              <button>View Files</button>
            </Link>
            <Link
              onClick={e => this.submit(e, this.props.id)}
              class="w-1/3 mr-2 bg-transparent hover:bg-red-500 text-red-700
              font-semibold hover:text-white py-2 border border-red-500
              hover:border-transparent rounded text-center"
            >
              <button>Delete</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DropLinkCard;
