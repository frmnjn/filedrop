import React, { Component } from "react";
import { connect } from "react-redux";

class CreateDropLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      username: props.username,
      dropLinkName: "",
      isCreated: false
    };
  }
  handleForm = e => {
    e.preventDefault();
    var url = "http://localhost:8000/createdroplink";
    var obj = {
      ownerId: this.state.id,
      dropLinkName: this.state.dropLinkName
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
          isCreated: true
        });
        console.log("Server Response:", response);
      });
  };
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    const notify = (
      <div
        className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>
          Create Drop Link Successful !<br />
          <p>
            Share this link to your friends!
            <br />
            http://localhost/drop/frmnjn/{this.state.dropLinkName}
          </p>
        </p>
      </div>
    );
    return (
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">
                Create Drop Link
              </h1>

              <div className="mt-4">
                <label>Drop Name</label>
                <input
                  type="text"
                  name="dropLinkName"
                  placeholder="Your Unique Drop Link"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                  value="Create"
                />
              </div>
              {this.state.isCreated ? notify : ""}
            </div>
          </form>
        </div>
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

export default connect(
  mapStateToProps,
  null
)(CreateDropLink);
