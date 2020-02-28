import React, { Component } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import axios from 'axios';


class NewTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: Cookies.get("name"),
      recordId: this.props.recordID,
      name: null,
      amount: null,
      sharedBy: [],
      sharedPeople: this.props.sharedPeople,
      checked: [false,false,false,false,false,false,false,false,false,false],
      comment: null
    };

     this.handleCheck = this.handleCheck.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sharedPeople: nextProps.sharedPeople });  
  }

  handleCheck(e, i){
    this.setState( {name : e.target.value});
    var temp = [];
    var x = 0;
    for(;x<10;x++){
      temp.push(false);
    }
    temp[i] = true;

    this.setState({checked: temp});
  }


  handleClick(e){
    var person = e.target.value;
    var index = this.state.sharedBy.indexOf(person)
    var temp = [...this.state.sharedBy];
    if(index == -1){
      temp.push(person);      
    }
    else{
      temp.splice(index,1);
    }
    this.setState({sharedBy: temp});

  }




  handleSubmit(event) {
      var displayShared = this.state.sharedBy.join(',');
      alert(displayShared);
    axios.post('http://localhost:3001/api/putTransaction', {
      owner: this.state.owner,
      recordId: this.state.recordId,
      payer: this.state.name,
      amount: this.state.amount,
      sharedBy: this.state.sharedBy,
      displayShared: displayShared,
      isResult: false,
      comment: this.state.comment,
    });
  }

  log = () => {
    console.log(this.state);
  }


  render() {
    return (
      <Popup trigger={<button style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>Add A Transaction</button>} key={this.props.sharedPeople}>
        {close => (
          <div>
            <div>
              <form>
                <p>
                  <label>
                    Paid By:
                  {this.state.sharedPeople.map((person, i) =>
                      <label key={person}>{person}<input type="radio" 
                      value={person} 
                      checked={this.state.checked[i]} 
                      onChange={(e) => this.handleCheck(e,i)}>
                        </input>
                        </label>
                    )}
                  </label>
                </p>
                <p>
                  <label>
                    Amount:
                  <input type="text" pattern="[0-9]*" onChange={(e) => this.setState({ amount: e.target.value })}></input>
                  </label>
                </p>
                <p>
                  <label>
                    Shared By:
                  {this.state.sharedPeople.map((person) =>
                      <label key={person}>{person}<input type="checkbox" value={person} onChange={(e) => this.handleClick(e)}></input></label>
                    )}
                  </label>
                </p>
                <p>
                  <label>
                    Comment:
                  <input type="text" onChange={(e) => this.setState({ comment: e.target.value })}></input>
                  </label>
                </p>
                <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e)} />
              </form>
            </div>
            <div>
              <button className="close" onClick={close} position="bottom right">
                close
              </button>
              <button onClick={() => this.log()}>
                log
              </button>
            </div>

          </div>
        )}
      </Popup>
    );
  }
}

export default NewTransaction;
