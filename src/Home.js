import React from 'react';
import FileDrop from 'react-file-drop';
import './App.css'
import {Label} from 'reactstrap';
  
class Home extends React.Component {
    handleDrop = (files, event) => {
        console.log(files, event);
    }

    render() {
        return (
            <div className="file-drop bawahindikit">
                <FileDrop onDrop={this.handleDrop}>
                    <Label>
                    Drop some files here!
                    </Label>
                </FileDrop>
            </div>
        );
    }
}

export default Home;
