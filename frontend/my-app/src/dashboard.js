import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Link } from "react-router-dom"

import newRecord from "./newRecord";

class Dashboard extends Component{
    state = {
        name: Cookies.get('name'),
        errors: {}
    }

    logout = () => {
        Cookies.remove('name');
        Cookies.remove('recordId');
    }

    render(){
        const { errors } = this.state;
        return(
        <div>
            <div className="containter">
                <p>
                    Hello {this.state.name}, welcome!
                </p>
            </div>
            <div>
                <Link to='/api/newRecord'>
                    Create New Record
                </Link>
            </div>
            <div>
                <Link to='/' onClick={this.logout()}>
                    Log out
                </Link>
            </div>
        </div>

        )
    }

}

export default Dashboard;