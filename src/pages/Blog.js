import React from "react";
import NavBar from "./NavBar";
import Router from './Router'
const BLOGURL = "http://localhost:3000/blogs";

class Blog extends React.Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    this.fetchBlogs();
  }

  fetchBlogs = (e) => {
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

  sanitizeBlogs = (blogs) => {
    return blogs.map((blog) => {
      return { id: blog.id, ...blog.attributes };
    });
  };

  render() {
    return (
      <>
        <NavBar/>
        <Router blogs={this.sanitizeBlogs(this.state.blogs)}/>
      </>
    );
  }

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
      const index = newBlogs.findIndex((el) => el.id === blog.data.id);
      newBlogs[index] = blog.data;
      return {
        ...prevState,
        blogs: newBlogs,
      };
    });
  };
}

export default Blog;
