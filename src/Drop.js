import React, { Component } from "react";
// import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import "./App.css";
import helper from "./url";
class Drop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploadFinished: false,
      progressVal: 0,
      linkValid: false,
      linkChecked: false,
      ownerEmail: null
    };
  }

  componentDidMount() {
    var obj = {
      body: {
        ownerUsername: this.props.match.params.username,
        droplinkName: this.props.match.params.droplink
      }
    };
    fetch(helper.url.lambda + "/checkdroplink", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.setState({
          linkChecked: true,
          linkValid: response.body.success,
          ownerEmail: response.body.ownerEmail
        });
        // console.log("Success:", this.state.ownerEmail);
      });
  }

  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpeg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //.docx files
      "text/plain" //.txt files
    ];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      console.log(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      console.log(msg);
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    let files = event.target.files;
    let size = 5000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      console.log(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = event => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files
      });
    }
  };
  onClickHandler = () => {
    console.log(this.state.selectedFile);
    const data = new FormData();
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);
    }
    // var config = {
    //   onUploadProgress: function(onUploadProgress) {
    //     console.log("uploading...");
    //   }
    // };
    // axios
    //   .post(
    //     "ec2-3-1-85-193.ap-southeast-1.compute.amazonaws.com:3333/drop/" +
    //       this.props.match.params.username +
    //       "/" +
    //       this.props.match.params.droplink,
    //     data,
    //     config
    //   )
    //   .then(res => {
    //     // then print response status
    //     console.log("upload success");
    //     console.log(res.data);
    //     this.setState({
    //       uploadFinished: true
    //     });
    //   })
    //   .catch(err => {
    //     // then print response status
    //     console.log("upload fail");
    //   });
    var url =
      helper.url.ec2 +
      "/drop/" +
      this.props.match.params.username +
      "/" +
      this.props.match.params.droplink;

    fetch(url, {
      method: "POST",
      // headers: {
      //   mode: "no-cors"
      // },
      body: data
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log(response);
        this.setState({ uploadFinished: true });
      }).then(
        this.sendNotification()
      )
  };

  sendNotification(){
  var url = helper.url.lambda+"/sendnotification";
  var obj = {
    body:{
    sendto: this.state.ownerEmail,
    droplinkName: this.props.match.params.droplink
    }
  }

  fetch(url, {
    method: "POST",
    // headers: {
    //   mode: "no-cors"
    // },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => {
      console.log(response.body);
    });
  }

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
        <p>Upload Successfull!</p>
      </div>
    );

    const spinner = (
      <div className="sweet-loading exact-center">
        <BeatLoader
          sizeUnit={"px"}
          size={30}
          color={"#38B2AC"}
          loading={!this.state.linkValid}
        />
        checking link ...
      </div>
    );

    const viewTrue = (
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500">
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Upload Files</h1>
              <div className="mt-4">
                {/* <label>Select Files</label> */}
                <input
                  type="file"
                  multiple
                  onChange={this.onChangeHandler}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={this.onClickHandler}
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
          {this.state.uploadFinished ? notify : ""}
        </div>
      </div>
    );

    const viewFalse = (
      <div className="exact-center text-3xl">
        <h1>Error 404</h1>
        <h1>Link Not Found</h1>
      </div>
    );

    return (
      <div>
        {this.state.linkChecked
          ? this.state.linkValid
            ? viewTrue
            : viewFalse
          : spinner}
      </div>
    );
  }
}

export default Drop;
