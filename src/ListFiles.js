import React, { Component } from "react";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import ReactTable from "react-table";
import "../node_modules/react-table/react-table.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import helper from "./url";
import { Redirect } from "react-router-dom";

class ListFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      username: props.username,
      email: props.email,
      name: props.name,
      currentFolder: null,
      files: [],
      isLoading: true
    };

    this.fetchdata = this.fetchdata.bind(this);
  }

  submit = (e, row) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure want to delete this?",
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
            this.deleteFile(e, row);
          }
        }
      ]
    });
  };

  async componentDidMount() {
    console.log("files page");
    this.fetchdata();
  }

  async fetchdata() {
    // var url = "http://localhost:8000/getlistfiles";
    var url = helper.url.lambda + "/getlistfiles";
    // var obj = {
    //   username: this.state.username,
    //   folder: this.props.match.params.folder
    // };
    var obj = {
      body: {
        username: this.state.username,
        droplinkName: this.props.match.params.folder
      }
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        // "Content-Type": "application/json"
        // authorization: localStorage.getItem("token")
        // "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        if (response.body.data != "there is no data") {
          console.log(response.body.data);
          var split = response.body.data[0].Key.split("/");

          this.setState({
            files: response.body.data,
            currentFolder: split[1]
          });
          // console.log("hmm", this.state.files);

          // this.state.files.map(function(file, index) {
          //   var date = new Date(file.LastModified).toString();
          //   this.state.files[index].LastModified = date;
          //   console.log(index, file.LastModified);
          // });

          console.log("currentFolder: ", this.state.currentFolder);
        } else {
          this.setState({
            files: [],
            currentFolder: null
          });
        }
      });
    this.setState({ isLoading: false });
  }

  // downloadFile(Key) {
  //   let url = "https://d1u37cwdvjwb8j.cloudfront.net/" + Key;
  //   return fetch(url, {
  //     method: "GET"
  //   })
  //     .then(function(resp) {
  //       return resp.blob();
  //     })
  //     .then(function(blob) {
  //       download(blob);
  //     });
  // }

  downloadAllFiles = e => {
    e.preventDefault();
    var Key = [];
    this.state.files.map(function(file) {
      var split = file.Key.split("/");
      Key.push(split[2]);
    });
    console.log(Key);
    var obj = {
      body: {
        ownerUsername: this.state.username,
        droplink: this.state.currentFolder,
        arrayfiles: Key
      }
    };
    var url = helper.url.lambda + "/downloadallfiles";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log(response);
        this.getzipped(response.key);
      })
      .then();
  };

  getzipped(key) {
    console.log(key);
    var url = helper.url.cloudfront + "/" + key;
    window.location = url;
  }

  deleteFile = async (e, Key) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    // console.log(Key);
    var url = helper.url.lambda + "/deletefile";
    var obj = {
      body: {
        Key: Key
      }
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
        console.log(response);
      })
      .then(this.fetchdata);
  };

  async deleteAllFiles(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    var Key = [];
    this.state.files.map(function(file) {
      Key.push({ Key: file.Key });
    });
    // console.log(data);
    var url = helper.url.lambda + "/deleteallfiles";
    var obj = {
      body: {
        Key: Key
      }
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
        console.log(response);
      })
      .then(this.fetchdata);
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
        Loading files ...
      </div>
    );

    const viewLoaded = (
      <div className="bg-gray-300">
        <div className="block px-4 py-2">
          <h1 className="text-black font-bold text-xl">List Files</h1>
        </div>
        {this.state.currentFolder ? (
          <div className="block px-4 py-3">
            <a
              onClick={
                e => this.downloadAllFiles(e)
                // helper.url.ec2 +
                // "/download/" +
                // this.state.username +
                // "/" +
                // this.state.currentFolder
              }
            >
              <button className="bg-green-300 hover:bg-green-400 text-gray-800 p-2 font-bold rounded inline-flex items-center mr-2">
                <span>Download All</span>
              </button>
            </a>
            <a onClick={e => this.deleteAllFiles(e)}>
              <button className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold p-2 rounded inline-flex items-center">
                <span>Delete All</span>
              </button>
            </a>
          </div>
        ) : (
          <div className="block px-4 py-3">
            <button
              disabled
              className="cursor-not-allowed bg-green-300 hover:bg-green-400 text-gray-800 p-2 font-bold rounded inline-flex items-center mr-2"
            >
              <span>Download All</span>
            </button>
            <a>
              <button
                onClick={e => this.deleteAllFiles(e)}
                disabled
                className="cursor-not-allowed bg-red-300 hover:bg-red-400 text-gray-800 font-bold p-2 rounded inline-flex items-center"
              >
                <span>Delete All</span>
              </button>
            </a>
          </div>
        )}

        <div className="w-auto block px-4 py-2  max-h-screen">
          <ReactTable
            data={this.state.files}
            defaultPageSize={9}
            filterable={false}
            sortable={false}
            columns={[
              {
                Header: "File Name",
                accessor: "Key", // String-based value accessors!
                Cell: row => {
                  var split = row.row.Key.split("/");
                  return <span className="text">{split[2]}</span>;
                }
              },
              {
                Header: "Size",
                accessor: "Size", // String-based value accessors!
                maxWidth: 150,
                Cell: row => {
                  var bytes = row.row.Size / 1024;
                  return <span className="text">{bytes.toFixed(1)} KB</span>;
                }
              },
              {
                Header: "Last Modified",
                accessor: "LastModified", // String-based value accessors!
                Cell: row => {
                  var date = Date(row.row.LastModified);
                  return (
                    <span className="text">
                      {new Date(row.row.LastModified).toLocaleString()}
                    </span>
                  );
                }
              },
              {
                Header: "Actions",
                accessor: "Key", // String-based value accessors!
                filterable: false,
                maxWidth: 150,
                Cell: row => (
                  <div>
                    <div className="mr-2 inline">
                      <a
                        href={
                          "https://d1u37cwdvjwb8j.cloudfront.net/" + row.row.Key
                        }
                        // onClick={e => this.downloadFile(e, row.row.Key)}
                      >
                        <button
                          class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center"
                          // onClick={e => this.downloadFile(e, row.row.Key)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                          >
                            <path
                              className="heroicon-ui"
                              d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
                            />
                          </svg>
                        </button>
                      </a>
                    </div>
                    <div className="mr-2 inline">
                      {/* <a onClick={e => this.deleteFile(e, row.row.Key)}> */}
                      <a onClick={e => this.submit(e, row.row.Key)}>
                        <button className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                          >
                            <path
                              className="heroicon-ui"
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
        </div>
      </div>
    );

    return <div>{!this.state.isLoading ? viewLoaded : spinner}</div>;
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
