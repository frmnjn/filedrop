import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners";
import ReactTable from "react-table";
import "../node_modules/react-table/react-table.css";

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
            Cell: row => (
              <div>
                <div>
                  <button>Edit</button>
                  <button>Delete</button>
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
