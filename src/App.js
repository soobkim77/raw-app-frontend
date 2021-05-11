import AuthForm from "./components/AuthForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogPage from "./pages/BlogPage";
import React from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom';


const USERURL = "http://localhost:3000/users";
const SESHURL = "http://localhost:3000/sessions";
const BLOGURL = "http://localhost:3000/blogs";

class App extends React.Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    user: {},
    blogs: []
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

  fetchBlogs = (e) => {
    // console.log(e, localStorage.getItem("jwt"))
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      }
    }

    fetch(BLOGURL, configObj)
    .then(r => r.json())
    .then(resp => {
      this.setState({blogs: resp.data})
    })
    
  }

  render() {
    return (
      <div className='App'>
        {/* <h1>Raw</h1>
        <button onClick={() => this.setState({ loggedIn: true })}>
          LOGIN SWITCH
        </button> */}

        <Switch>
          <Route exact path="/">{this.renderForm()}</Route>
          <Route
            exact path='/blogs'
            render={() => (
              <BlogPage data={this.fetchBlogs} blogs={this.state.blogs} />
            )}
          />
          <Route exact path='/blogs/:id' render={() => <Blog />} />
          <Route exact path='/blog/create'>
            <BlogForm />
          </Route>
        </Switch>
      </div>
    );
  }



  renderForm = () => {
    return this.state.loggedIn ? (
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
    );
}




}

export default App;
