import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Comment from './Comment'

const LIKEURL = "http://localhost:3000/likes"
const URL = "http://localhost:3000/comments"

const Blog = (props) => {
    const [content, setContent] = useState();
    const [comments, setComments] = useState(props.blog.attributes.comments.data)
    const [blogLikes, setBlogLikes] = useState(props.blog.attributes.likecount)
    const [blogBoolean, setBlogBoolean] = useState(false)
    const [likeBoolean, setLikeBoolean] = useState(false)
    const classes = useStyles();

    const newLikeBlog = () => {
        const body = {
            likeable_id: props.blog.id,
            likeable_type: "Blog"
        };

        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
              },
            body: JSON.stringify(body)
        };

        fetch(LIKEURL, configObj)
        .then(r => r.json())
        .then(resp => {
            if (resp.message){
                setLikeBoolean(true)
            } else {
                setBlogBoolean(true)
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
        fetch(URL, configObj)
        .then(r => r.json())
        .then(resp => {
            let x = [...comments, resp.data]
            setComments(x)
        }
        )
    }

    const deleteComment = (commentID) => {
        let configObj = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          }
        }
        fetch(`http://localhost:3000/comments/${commentID}`, configObj)
        .then(r => r.json()) 
    }

    const handleDelete = (commentID) =>{
        setComments(comments.filter(x => x.id !== commentID))
    }

    const combinedDelete = (id) => {
        handleDelete(id);
        deleteComment(id);
    }

    const handleChange = (event, type) => {
        let stateMap = {
          content: (event) => setContent(event.target.value)
        };
        
        stateMap[type](event);
    }
    
    return (
        <div>
            <img src={props.blog.attributes.img} alt=""/>
            <h1>{props.blog.attributes.title}</h1>
            <h4>By: {props.blog.attributes.user}</h4>
            <span> Liked by {blogLikes} people</span>
            <p>
                {props.blog.attributes.content}
            </p>

            <button>+ New Comment</button>
            <form 
            onSubmit={(e) => submitComment(e, content, props.blog.id)}
            className={classes.root}
            noValidate
            autoComplete='off'
            >
                <TextField
                placeholder='New Comment'
                multiline
                value={content}
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
            {blogBoolean ? null : <button onClick={() => newLikeBlog()}>LIKE ME PLS!!!</button>}
            {likeBoolean ? <p>You've already liked this post!</p> : null}
            <div>
                {comments.map(comment =>{
                    return (
                       <Comment key={comment.id} comment={comment} deleteCom={combinedDelete} />
                    )
                })}
            </div>
        </div>
    )
}

export default Blog


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