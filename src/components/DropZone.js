import React, { Component } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

class DropZone extends Component {
  getUploadParams = ({ meta }) => {
    return { url: "http://localhost:8000/uploadmultiple" };
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => {
    console.log("onChangeStatus", status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };
  render() {
    return (
      <Dropzone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        accept="*"
      />
    );
  }
}

export default DropZone;
