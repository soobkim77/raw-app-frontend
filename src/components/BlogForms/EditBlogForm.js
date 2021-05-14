import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
/*  Material UI  */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// Material UI styles

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}));

const defState = {
  content: "an ululate accursed.",
  created_at: "2021-05-12T20:30:07.124Z",
  id: "176",
  img: "https://picsum.photos/200/300",
  title: "Praise Kai!",
  user: "Miles Teg",
};

const URL = "http://localhost:3000/blogs/";

const EditBlogForm = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [blog, setBlog] = useState(defState);

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

    setBlog(newBlog);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBlog({...blog, [name]:value})
  };

const handleSubmit = (e, {title, content, img}, id) => {
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

  fetch(URL + "/" + id, configObj)
    .then((r) => r.json())
    .then((respBlog) => submitHelper(respBlog))
    .catch((e) => console.error("error: ", e));
  }; 
  
  const submitHelper = (respBlog) => {
    props.edit(respBlog);
  };


  return (
    <Fragment>
      <form
        onSubmit={(event) => handleSubmit(event, blog, id)}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        <TextField
          placeholder='Title'
          multiline
          name='title'
          value={blog.title}
          onChange={(event) => handleChange(event)}
          variant='outlined'
        />
        <TextField
          placeholder='Content'
          multiline
          name='content'
          value={blog.content}
          onChange={(event) => handleChange(event)}
          variant='outlined'
        />
        <TextField
          placeholder='Image Url'
          multiline
          name='img'
          value={blog.image}
          onChange={(event) => handleChange(event)}
          variant='outlined'
        />
        <Button
          type='submit'
          variant='contained'
          color='default'
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Publish
        </Button>
      </form>
    </Fragment>
  );
};




export default EditBlogForm;