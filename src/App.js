import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Menubar from './Menubar';
import Home from './Home';
import Drop from './Drop';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <Router>
    <div className="App">
      <Menubar />
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/drop' component={Drop} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
