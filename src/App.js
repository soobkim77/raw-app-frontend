import LogIn from './components/LogIn'
import React from 'react';
import './App.css';

class App extends React.Component {
  
  state = {
    user: {
      username: "",
      password: ""
    }
  }

  handleUserChange = (e) => {
    this.setState({user: {...this.state.user, username: e.target.value}})
  }

  handlePasswordChange = (e) => {
    this.setState({user: {...this.state.user, password: e.target.value}})
  }

  render() {
    return (
      <div className="App">
        <h1>Log-In App</h1>
        <LogIn handleUser={this.handleUserChange} handlePassword={this.handlePasswordChange}/>
        <h1>Hello</h1>
      </div>
  );
  }
}

export default App;

