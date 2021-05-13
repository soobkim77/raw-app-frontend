import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Link from "@material-ui/core/Link";
import Comment from './Comment'

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

const LIKEURL = "http://localhost:3000/likes"
const URL = "http://localhost:3000/blogs/";
const COMMURL = "http://localhost:3000/comments/";
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
    const [blogLikes, setBlogLikes] = useState()
    const [likeBoolean, setLikeBoolean] = useState(false)
    const [unlikeBoolean, setUnlikeBoolean] = useState(false)
    const [newComm, setNewComm] = useState();

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
      const newComments = data.data.attributes.comments.data;
      setBlog(newBlog);
      setComments(newComments);
      setBlogLikes(data.data.attributes.likecount)
    };

    const deleteComment = (commentID) => {
      let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      }
      fetch(`http://localhost:3000/comments/${commentID}`, configObj)
    }
      
    const handleDelete = (commentID) =>{
      setComments(comments.filter(x => x.id !== commentID))
    }

    const combinedDelete = (id) => {
      handleDelete(id);
      deleteComment(id);
    }

    const newLikeBlog = () => {
        const body = {
            likeable_id: blog.id,
            likeable_type: "Blog"
        };

        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt")}`
              },
            body: JSON.stringify(body)
        };

        fetch(LIKEURL, configObj)
        .then(r => r.json())
        .then(resp => {
            if (resp.message){
                setLikeBoolean(true)
                setTimeout(()=>setLikeBoolean(false), 3000)
            } else {
                setBlogLikes(blogLikes + 1)
            }
        } )
        
        
    }

    const deleteLikeBlog = (blogID) => {
        const configObj = {
            method: "DELETE",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
              },
            body: JSON.stringify({
                likeable_id: blogID,
                likeable_type: "Blog"
            })
        };
        fetch(LIKEURL + "/" + 1, configObj)
        .then(r => r.json())
        .then(resp => {
            if(resp.status === 500){
                setUnlikeBoolean(true)
                setTimeout(()=>setUnlikeBoolean(false), 3000)
            } else {
                setBlogLikes(blogLikes - 1)
            }
        })
    }

    const submitComment = (e, cont, blogID) => {
        e.preventDefault();
        
        const bod = {
                content: cont,
                blog_id: blogID
        }
        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
              },
            body: JSON.stringify(bod)
        };
        fetch(COMMURL, configObj)
        .then(r => r.json())
        .then(resp => {
            let x = [...comments, resp.data]
            setComments(x)
        }
        )
    }

    const handleChange = (event) => {
        setNewComm(event.target.value)
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
        <span>{blogLikes} likes</span>
      </Grid>
      <Button variant="contained" onClick={() => newLikeBlog()}>Like!</Button>
      {likeBoolean ? <p>You've already liked this post!</p> : null}
      <Grid>
        <form 
          onSubmit={(e) => submitComment(e, newComm, blog.id)}
          className={classes.root}
          noValidate
          autoComplete='off'
          >
              <TextField
              placeholder='New Comment'
              multiline
              value={newComm}
              onChange={(event) => handleChange(event, "content")}
              variant='outlined'
              />
              <Button
                  type="submit"
                  variant='contained'
                  color='default'
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
              >
                  Publish
              </Button>
          </form>
        {comments.map(comment =>{
              return (
                  <Comment key={comment.id} comment={comment} deleteCom={combinedDelete} />
              )
        })}
      </Grid>
    </Paper>
  );
}
