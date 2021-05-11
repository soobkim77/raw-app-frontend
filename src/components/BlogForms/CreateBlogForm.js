import React, {useState} from 'react';
import { Fragment } from 'react';

/*  Material UI  */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const URL = "http://localhost:3000/blogs";

const CreateBlogForm = () => {
    const classes = useStyles();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [img, setImg] = useState();

    const handleChange = (event, type) => {
        let stateMap = {
          title: (event) => setTitle(event.target.value),
          content: (event) => setContent(event.target.value),
          img: (event) => setImg(event.target.value),
        };
        
        stateMap[type](event);
    }

    return (
      <Fragment>
        <form
          onSubmit={(e) => handleSubmit(e, title, content, img)}
          className={classes.root}
          noValidate
          autoComplete='off'
        >
          <TextField
            placeholder='Title'
            multiline
            value={title}
            onChange={(event) => handleChange(event, "title")}
            variant='outlined'
          />
          <TextField
            placeholder='Content'
            multiline
            value={content}
            onChange={(event) => handleChange(event, "content")}
            variant='outlined'
          />
          <TextField
            placeholder='Image Url'
            multiline
            value={img}
            onChange={(event) => handleChange(event, "img")}
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
      </Fragment>
    );
}

export default CreateBlogForm;

const handleSubmit = (e, title, content, img) => {
    e.preventDefault();
    const body = {
        blog: {
            title,
            content,
            img
        }}
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
      body: JSON.stringify(body)
    };

    fetch(URL, configObj)
        .then(r => r.json())
        .then(console.log)
        .catch(e => console.error('error: ', e))

}

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