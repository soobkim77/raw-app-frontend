import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";


const URL = "http://localhost:3000/comments"
const defaultImg =
  "https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg";


const submitComment = (e, cont, blogID) => {
    e.preventDefault();
    
    const bod = {
            content: cont,
            blog_id: blogID
    }
    console.log(JSON.stringify(bod))
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
    .then(data => console.log(data))
}


const Blog = (props) => {
    const [content, setContent] = useState();
    const classes = useStyles();
  debugger
  
    const img =
       Object.keys(props.blog).length === 0
        ? defaultImg
        : props.blog.attributes.img;
  
    const handleChange = (event, type) => {
        let stateMap = {
          content: (event) => setContent(event.target.value)
        };
        
        stateMap[type](event);
    }
    
    return (
        <div>
            <img src={img} alt=""/>
            {/* <h1>{props.blog.attributes.title}</h1>
            <h4>By: {props.blog.attributes.user}</h4>
            <p>
                {props.blog.attributes.content}
            </p> */}

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