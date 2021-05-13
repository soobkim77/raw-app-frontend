import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  mainFeaturedBlog: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedBostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const URL = "http://localhost:3000/blogs/";
const initialState = {
  title: "default",
  img: "default",
  content: "default",
};

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
    <Paper
      className={classes.mainFeaturedBlog}
      style={{ backgroundImage: `url(${blog.image})` }}
    >
      {
        <img
          style={{ display: "none" }}
          src={blog.image}
          alt={blog.imageText}
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedBlogContent}>
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom
            >
              {blog.title}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {blog.content}
            </Typography>
            <Link variant='subtitle1' href='#'>
              {blog.title}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
