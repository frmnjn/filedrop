import React, { Component } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import helper from "../url";
import BeatLoader from "react-spinners/BeatLoader";

class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  getUploadParams = async ({ meta: { name, type } }) => {
    var fields, uploadUrl;
    var obj = {
      body: {
        Key:
          this.props.match.params.username +
          "/" +
          this.props.match.params.droplink +
          "/" +
          name,
        type: type
      }
    };
    await fetch(helper.url.lambda + "/upload", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        fields = response.fields;
        uploadUrl = response.url;
      });
    return { fields, url: uploadUrl };
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => {
    console.log("onChangeStatus", status, meta);
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };
  render() {
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
      <Dropzone
        className="h-screen max-h-screen"
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        submitButtonContent="Clear"
        accept="*"
      />
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

export default DropZone;
