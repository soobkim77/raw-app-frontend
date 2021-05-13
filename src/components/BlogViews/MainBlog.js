import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayBlog from "./DisplayBlog";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const URL = "http://localhost:3000/blogs/";

const initialState = {
  content:
    "Amorphous comprehension tenebrous immemorial cat nameless. Gibbering accursed singular hideous iridescence. Lurk tentacles unmentionable decadent antiquarian ululate accursed.Anmentionable decadent antiquarian ululate accursed.Amorphous comprehension tenebrous immemorial cat nameless. Gibbering accursed singular hideous iridescence. Lurk tentacles unmentionable decadent antiquarian ululate accursed.",
  created_at: "2021-05-12T20:30:07.124Z",
  id: "176",
  img: "https://picsum.photos/200/300",
  title: "Praise Kai!",
  user: "Miles Teg",
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function MainBlog() {
  const classes = useStyles();
  const [blog, setBlog] = useState(initialState);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    fetch(URL + id, configObj)
      .then((r) => r.json())
      .then((data) => sanitize(data))
      .catch((e) => console.error("e:", e));
  }, []);

  const sanitize = (data) => {
    const newBlog = {
      id: data.data.id,
      content: data.data.attributes.content,
      created_at: data.data.attributes.created_at,
      img: data.data.attributes.img,
      title: data.data.attributes.title,
      user: data.data.attributes.user,
    };
    const newComments = {
      comments: data.data.attributes.comments.data,
    };
    setBlog(newBlog);
    setComments(newComments);
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={8}>
        <DisplayBlog blog={blog} />
      </Grid>
    </Grid>
  );
}
