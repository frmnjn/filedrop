import React from 'react';
import './App.css'
  
class Home extends React.Component {
    handleDrop = (files, event) => {
        console.log(files, event);
    }

    render() {
        return (
            <div className="bawahindikit">
                <h1>HALOO</h1>
            </div>
        );
    }
}

export default Home;
