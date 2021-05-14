import React, { useState, useEffect } from "react";
import UserBlogList from "../containers/UsersBlogList";
import NavBar from "./NavBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    flexGrow: 1,
  },
}));

const URL = "http://localhost:3000/users/";
const BLURL = "http://localhost:3000/blogs/";

const initialState = {
  content:
    "Amorphous comprehension tenebrous immemorial cat nameless. Gibbering accursed singular hideous iridescence. Lurk tentacles unmentionable decadent antiquarian ululate accursed.Anmentionable decadent antiquarian ululate accursed.Amorphous comprehension tenebrous immemorial cat nameless. Gibbering accursed singular hideous iridescence. Lurk tentacles unmentionable decadent antiquarian ululate accursed.",
  created_at: "2021-05-12T20:30:07.124Z",
  id: "176",
  img: "https://picsum.photos/200/300",
  title: "Praise Kai!",
  user: "Miles Teg",
};

export default function Profile() {
  
  const [comments, setComments] = useState("Holds The Power!");
  const [blogs, setBlogs] = useState(initialState);
  const [name, setName] = useState("Kai");
  const classes = useStyles();

  useEffect(() => {
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    fetch(URL, configObj)
      .then((r) => r.json())
      .then((resp) => sanitizer(resp))
      .catch((e) => console.error("e:", e));
  }, []);

  const sanitizer = (data) => {
    setName(data.data.attributes.username);
    setBlogs(data.data.attributes.blogs);
    setComments(data.data.relationships.comments.data);
    console.log(data);
  };

  const handleDelete = (blog) => {
      const configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
    fetch(BLURL + blog.id, configObj)
      .then((r) => r.json())
      .then(() => deleteHelper(blog));
  };

const deleteHelper = (bl) => {
    const newBlogs = blogs.filter((b) => b.id !== bl.id)
    setBlogs(newBlogs);
  }

  return (
    <div>
      <NavBar user={name} />
      {<UserBlogList blogs={blogs} handleDelete={handleDelete} /> || (
        <CircularProgress color='secondary' />
      )}
    </div>
  );
}
