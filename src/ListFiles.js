import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners";
import ReactTable from "react-table";
import "../node_modules/react-table/react-table.css";
import { Link } from "react-router-dom";

class ListFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      username: props.username,
      email: props.email,
      name: props.name,
      files: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    console.log("files page");
    var url = "http://localhost:8000/getlistfiles";
    var obj = {
      username: this.state.username,
      folder: this.props.match.params.folder
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
          files: response.data
        });
      });
  }

  render() {
    const spinner = (
      <div className="sweet-loading exact-center">
        <BeatLoader
          sizeUnit={"px"}
          size={30}
          color={"#38B2AC"}
          loading={true}
        />
        getting files ...
      </div>
    );

    const viewLoaded = (
      <ReactTable
        data={this.state.files}
        defaultPageSize={10}
        filterable
        columns={[
          {
            Header: "File Name",
            accessor: "Key" // String-based value accessors!
          },
          {
            Header: "Size",
            accessor: "Size" // String-based value accessors!
          },
          {
            Header: "Last Modified",
            accessor: "LastModified" // String-based value accessors!
          },
          {
            Header: "Actions",
            accessor: "Key", // String-based value accessors!
            filterable: false,
            maxWidth: 150,
            Cell: row => (
              <div>
                <div className="m-2 inline">
                  <a href="http://google.com">
                    <button class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          class="heroicon-ui"
                          d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="m-2 inline">
                  <a href="http://google.com">
                    <button class="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          class="heroicon-ui"
                          d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            )
          }
        ]}
      />
    );

    return <div>{this.state.isLoaded ? viewLoaded : "Loading Data"}</div>;
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.user.id,
    name: state.auth.user.name,
    username: state.auth.user.username,
    email: state.auth.user.email
  };
};

export default connect(
  mapStateToProps,
  null
)(ListFiles);
