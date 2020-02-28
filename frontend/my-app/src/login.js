import React, { Component } from 'react';
import axios from 'axios';
import { withRouter,Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'


class Login extends Component {
  state = {
    data: [],
    name: null,
    email: null,
    valid: null,
  };

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (name,email) => {
    axios.post('http://localhost:3001/api/putData', {
      name: name,
      email: email,
    });
  };

  authentication = (name) => {
       axios.post('http://localhost:3001/api/authentication',{
       name: name,
     }).then((response) => {
       if(response.data.success){
          this.setState({ valid: true });
          Cookies.set('name',name, {path: '/api'});
       }
       
     });



  }



  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    if(this.state.valid){
      return <Redirect to='/api/dashboard' />
    }
    else{
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="Your Username"
            style={{ width: '200px' }}
          />
          <input
            type="text"
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="Your Email"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.name,this.state.email)}>
            SIGN UP
          </button>
          <button onClick={() => this.authentication(this.state.name)}>
            LOG IN
          </button>
        </div>
      </div>
    );
    }
  }
}

export default withRouter(Login);