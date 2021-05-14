import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Router from "./Router";

const BLOGURL = "http://localhost:3000/blogs";

const Blogs = () => {
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = (e) => {
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
        setBlogs(resp.data);
      });
  };

  const sanitizeBlogs = (blogs) => {
    return blogs.map((blog) => {
      return { id: blog.id, ...blog.attributes };
    });
  };

  const helpEdit = (blog) => {
    const newBlogs = [...blogs];
    const index = newBlogs.findIndex((el) => el.id === blog.data.id);
    newBlogs[index] = blog.data;
    setBlogs(newBlogs);
    history.push(`/blogs/${blog.data.id}`);
  };


  return (
    <>
      <NavBar />
      <Router blogs={sanitizeBlogs(blogs)} edit={helpEdit} />
    </>
  );
};

export default Blogs;
