import React, { Component, PureComponent } from 'react';
import uuid from 'uuid/v4'
import './App.css';

const peeps = [{ id: uuid(), name: "jimmy" }, { id: uuid(), name: "tyler"}, { id: uuid(), name: "aaron"}];
function makeString(length) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { peeps };

    this.pushPeep = this.pushPeep.bind(this);
    this.removePeep = this.removePeep.bind(this);
    this.insertPeep = this.insertPeep.bind(this);
  }

  pushPeep() {
    const peeps = [...this.state.peeps];
    peeps.unshift({ id: uuid(), name: makeString(5) });
    this.setState({ peeps });
  }

  removePeep() {
    const peeps = [...this.state.peeps];
    peeps.shift();
    this.setState({ peeps });
  }

  insertPeep() {
    const peeps = [...this.state.peeps];
    peeps.splice(peeps.length / 2, 0, { id: uuid(), name: makeString(5) })
    this.setState({ peeps });
  }


  render() {
    const { peeps } = this.state;
    return (
      <div className="App" style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>List using index</h2>
          {peeps.map((peep, index) => <Peep key={index} peepName={peep.name} peepVersion="{index} for {key}"/>)}
        </div>
        <hr/>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>List using unique IDs</h2>
          {peeps.map((peep) => <Peep key={peep.id} peepName={peep.name} peepVersion="{uuid} for {key}"></Peep>)}
        </div>
        <hr/>

        <button onClick={this.pushPeep}>Add a Person</button>
        <button onClick={this.insertPeep}>Insert a Person</button>
        <button onClick={this.removePeep}>Remove a Person</button>
      </div>
    );
  }
}

// class Peep extends Component {
//   render() {
//     console.log(`{${this.props.peepName}} using ${this.props.peepVersion} rendered`)
//     return <p>{this.props.peepName}</p>
//   }
// }

class Peep extends PureComponent {
  render() {
    console.log(`{${this.props.peepName}} using ${this.props.peepVersion} rendered`)
    return <p>{this.props.peepName}</p>
  }
}


export default App;
