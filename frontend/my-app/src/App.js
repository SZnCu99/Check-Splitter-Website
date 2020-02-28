import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";


import Login from "./login";
import Dashboard from "./dashboard";
import newRecord from "./newRecord";

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "App">
          <Route exact path="/" component={Login} />
          <Route exact path="/api/dashboard" component={Dashboard} />
          <Route exact path="/api/newRecord" component={newRecord} />
        </div>
      </Router>
    );
  }
}

export default App;