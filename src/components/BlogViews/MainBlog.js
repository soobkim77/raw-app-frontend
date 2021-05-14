import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayBlog from "./DisplayBlog";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Comment from "./Comment";

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
  butt: {
    marginTop: ".5em",
  },
  commentForm: {
    marginTop: ".5em",
    marginBottom: ".5em",
  },
}));

const LIKEURL = "http://localhost:3000/likes";
const URL = "http://localhost:3000/blogs/";
const COMMURL = "http://localhost:3000/comments/";

export default function MainBlog() {
  const classes = useStyles();
  const [blog, setBlog] = useState(initialState);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [blogLikes, setBlogLikes] = useState();
  const [likeBoolean, setLikeBoolean] = useState(false);
  const [unlikeBoolean, setUnlikeBoolean] = useState(false);
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
      likes: data.data.attributes.likecount,
    };
    const newComments = data.data.attributes.comments.data;
    setBlog(newBlog);
    setComments(newComments);
    setBlogLikes(data.data.attributes.likecount);
  };

  const deleteComment = (commentID) => {
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    fetch(`http://localhost:3000/comments/${commentID}`, configObj);
  };

  const handleDelete = (commentID) => {
    setComments(comments.filter((x) => x.id !== commentID));
  };

  const combinedDelete = (id) => {
    handleDelete(id);
    deleteComment(id);
  };

  const newLikeBlog = () => {
    const body = {
      likeable_id: blog.id,
      likeable_type: "Blog",
    };

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    };

    fetch(LIKEURL, configObj)
      .then((r) => r.json())
      .then((resp) => {
        if (resp.message) {
          setLikeBoolean(true);
          setTimeout(() => setLikeBoolean(false), 3000);
        } else {
          setBlogLikes(blogLikes + 1);
        }
      });
  };

  const deleteLikeBlog = (blogID) => {
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        likeable_id: blogID,
        likeable_type: "Blog",
      }),
    };
    fetch(LIKEURL + "/" + 1, configObj)
      .then((r) => r.json())
      .then((resp) => {
        if (resp.status === 500) {
          setUnlikeBoolean(true);
          setTimeout(() => setUnlikeBoolean(false), 3000);
        } else {
          setBlogLikes(blogLikes - 1);
        }
      });
  };

  const submitComment = (e, cont, blogID) => {
    e.preventDefault();

    const bod = {
      content: cont,
      blog_id: blogID,
    };
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(bod),
    };
    fetch(COMMURL, configObj)
      .then((r) => r.json())
      .then((resp) => {
        let x = [...comments, resp.data];
        setComments(x);
      });
  };

  const handleChange = (event) => {
    setNewComm(event.target.value);
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={8}>
          <DisplayBlog
            blog={blog}
            like={newLikeBlog}
            likes={blogLikes}
            unlike={deleteLikeBlog}
            unlikeBool={unlikeBoolean}
            likeBool={likeBoolean}
          />
        </Grid>
      </Grid>

      <Grid
        container
        direction='column'
        alignItems='center'
        spacing={0}
        justify='center'
        className={classes.commentForm}
      >
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
            type='submit'
            variant='contained'
            color='default'
            className={classes.butt}
            startIcon={<CloudUploadIcon />}
          >
            Publish
          </Button>
        </form>
      </Grid>
      <Grid
        container
        direction='column'
        alignItems='center'
        spacing={0}
        justify='center'
      >
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              deleteCom={combinedDelete}
            />
          );
        })}
      </Grid>
    </div>
  );
}
