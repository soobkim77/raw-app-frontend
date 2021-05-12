import AuthForm from "./components/AuthForm";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/BlogForms/CreateBlogForm";
import EditBlogForm from "./components/BlogForms/EditBlogForm";
import BlogPage from "./pages/BlogPage";
import React from "react";
import "./App.css";
import { Route, Switch} from "react-router-dom";

const USERURL = "http://localhost:3000/users";
const SESHURL = "http://localhost:3000/sessions";
const BLOGURL = "http://localhost:3000/blogs";

class App extends React.Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
    user: {},
    blogs: [],
    blog: {},
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
      .then(() =>
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

  showBlog = (blog) => {
    this.setState({ blog });
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    fetch(BLOGURL, configObj)
      .then((r) => r.json())
      .then((resp) => {
        this.setState({ blogs: resp.data });
      });
  };

  handleSubmit = (e, title, content, img, id) => {
    e.preventDefault();
   
    const body = {
      blog: {
        title,
        content,
        img,
      },
    };

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    };
    
    fetch(BLOGURL + "/" + id, configObj)
      .then((r) => r.json())
      .then((blog) => this.helpEdit(blog))
        .catch((e) => console.error("error: ", e));
  };

  helpEdit = (blog) => {
    this.setState((prevState) => {
      const newBlogs = [...prevState.blogs];
      const index = newBlogs.findIndex((el) => el.id === blog.data.id)
      newBlogs[index] = blog.data;
      return {
        ...prevState,
        blogs: newBlogs
      }
    });
  }

componentDidMount(){
this.fetchBlogs()
}
  
  render() {
    return (
      <div className='App'>
        {/* <h1>Raw</h1>
        <button onClick={() => this.setState({ loggedIn: true })}>
          LOGIN SWITCH
        </button> */}

        <Switch>
          <Route exact path='/'>
            {this.renderForm()}
          </Route>
          <Route
            exact
            path='/blogs'
            render={() => (
              <BlogPage
                data={this.fetchBlogs}
                blogs={this.state.blogs}
                showBlog={this.showBlog}
              />
            )}
          />
          <Route
            exact
            path='/blogs/:id'
            render={() => <Blog blog={this.state.blog} />}
          />
          <Route exact path='/blogs/create' component={CreateBlogForm} />
          <Route
            exact
            path='/blogs/edit/:id'
            render={(routerProps) => {
              let blog = this.state.blogs.find(
                (blog) => routerProps.match.params.id === blog.id
              );
              return (
                <EditBlogForm handleSubmit={this.handleSubmit} blog={blog} />
              );
            }}
          ></Route>
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
  };
}

export default App;
