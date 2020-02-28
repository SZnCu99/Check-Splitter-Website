import React, { Component } from "react";
import Cookies from "js-cookie";
import NewTransaction from "./NewTransaction";
import Table from "react-table-6";
import 'react-table-6/react-table.css'
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom"


class newRecord extends Component {

  constructor() {
    super();

    this.state = {
    recordId: Cookies.get('recordId'),
    owner: Cookies.get('name'),
    date: null,
    transactions: [],
    currentName: null,
    sharedBy: [Cookies.get("name")],
    numShared: 1,
    intervalIsSet: false,
    created: false,
    errors: {}
  };

  this.getRecordFromDb = this.getRecordFromDb.bind(this);

}

  componentDidMount() {
  
//    alert(this.state.recordId);
    this.getRecordFromDb(this.state.recordId);
    if(this.state.recordId != null){
    this.getTransactionFromDb(this.state.recordId);
    }
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }

  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }

  }


  getRecordFromDb = (id) => {
    axios.post('http://localhost:3001/api/getRecord',{
      id: id,
    })
      .then((res) => {
        if(res.data.success == true){
        console.log(res.data.record);
        const record = res.data.record;
        this.setState({ sharedBy: record.sharedBy, recordId: record._id, date: record.date, created: true})
        console.log(this.state.sharedBy);
      }
        else{
          alert(res);
        }

      });
  };

  getTransactionFromDb = (id) => {
    console.log(id);
    axios.post('http://localhost:3001/api/getTransaction', {
      recordId: id,
    })
      .then((res) => {
        console.log(res.data.transactions);
        this.setState({ transactions: res.data.transactions});
        });
      console.log(this.state.transactions);
  };

  addSharedBy = (name) => {
    var temp = [...this.state.sharedBy];
    temp.push(name);
    this.setState({sharedBy: temp});
    var num = this.state.numShared + 1;
    this.setState({numShared:num});
    console.log(this.state.sharedBy);
    console.log(this.state.numShared);
    console.log(this.state.currentName);
    console.log(this.state.owner);
  };

  createRecord = (event) =>{
      axios.post('http://localhost:3001/api/putRecord', {
        owner: this.state.owner,
        date: this.state.date,
        sharedBy: this.state.sharedBy,
        transactions: [],
    }).then((response) => {
        if(response.data.success){
          this.setState({recordId: response.data.recordId});
          Cookies.set('recordId',response.data.recordId);
          this.setState({created: true});
        }
    });
  };

  logout = () => {
    Cookies.remove(this.state.owner);
    Cookies.remove(this.state.recordId);
}


  
  render() {
    const columns = [
            {
              Header: 'Payer',
              accessor: 'payer',
            },
            {
              Header: 'Amount',
              accessor: 'amount',
            },
            {
              Header: 'Shared With',
              accessor: 'displayShared'
            },
            {
              Header: 'Comment',
              accessor: 'comment',
            },
          ]

    return (

      <div>

          Creating new record for {this.state.owner}...
          <label style={this.state.created ? {display: 'none'} : {}}>
            Shared with:{this.state.sharedBy} 
            <input type="text" placeholder="name" onChange={(e) => this.setState({ currentName: e.target.value })}></input>
            <button onClick={() =>this.addSharedBy(this.state.currentName)}>Add Sharer</button>
            <input type="date" placeholder="date" onChange={(e) => this.setState({ date: e.target.value})}></input>
            <button onClick={(e) => this.createRecord(e)}>Create New Record</button>
          </label>
          <Link to='/' onClick={this.logout()}>
                    Log out
                </Link>
          
        <div>
          <Table columns={columns} data={this.state.transactions} />
        </div>    
        <div>
        <NewTransaction sharedPeople={this.state.sharedBy} num={this.state.numShared} recordID={this.state.recordId} />
        </div>
      </div>
    );
  }
}

export default newRecord;
