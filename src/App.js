import AuthForm from "./components/AuthForm";
import React from "react";
import "./App.css";

const USERURL = "http://localhost:3000/users";
const SESHURL = "http://localhost:3000/sessions";

class App extends React.Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    user: {},
  };

  handleUserChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleCreateUser = (e) => {
    e.preventDefault();
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
        },
      }),
    };

    fetch(USERURL, configObj)
      .then((r) => r.json())
      .then((loggedIn) =>
        this.setState({
          loggedIn: !this.state.login,
          username: "",
          password: "",
        })
      );
    e.target.reset();
  };

  handleLogin = (e) => {
    e.preventDefault();
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
        },
      }),
    };

    fetch(SESHURL, configObj)
      .then((r) => r.json())
      .then((resp) => this.userHelper(resp));
  };

  userHelper = (resp) => {
    this.setState(
      { user: resp.user.data.attributes, username: "", password: "" },
      window.localStorage.setItem("jwt", resp.jwt)
    );
  };

  render() {
    return (
      <div className='App'>
        <h1>Raw</h1>
        {this.state.loggedIn ? (
          <AuthForm
            handleUser={this.handleUserChange}
            handlePassword={this.handlePasswordChange}
            handleSubmit={this.handleLogin}
            buttonText={"Log In"}
          />
        ) : (
          <AuthForm
            handleUser={this.handleUserChange}
            handlePassword={this.handlePasswordChange}
            handleSubmit={this.handleCreateUser}
            buttonText={"Create User"}
          />
        )}
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
