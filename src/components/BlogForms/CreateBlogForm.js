import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/*  Material UI  */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#f44336",
  },
}));

const URL = "http://localhost:3000/blogs";

const CreateBlogForm = () => {
  const history = useHistory();
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
  
  const handleSubmit = (e, title, content, img) => {
    e.preventDefault();
    const body = {
      blog: {
        title,
        content,
        img,
      },
    };
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(body),
    };

    fetch(URL, configObj)
      .then((r) => r.json())
      .then((data) => {history.push(`/blogs/${data.data.id}`)})
      .catch((e) => console.error("error: ", e));
  };

    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        m={12}
        p={1}
        bgcolor='background.paper'
      >
        <form
          onSubmit={(event) => handleSubmit(event, title, content, img)}
          noValidate
          autoComplete='off'
        >
          <Typography
            alignContent='center'
            className={classes.icon}
            variant='h6'
            noWrap
          >
            N E W B L O G T I T L E
          </Typography>
          <TextField
            justifyContent='center'
            placeholder='Title'
            multiline
            name='title'
            value={title}
            onChange={(event) => handleChange(event, "title")}
            variant='outlined'
          />{" "}
          <Typography className={classes.icon} variant='h6' noWrap>
            I M A G E
          </Typography>
          <TextField
            placeholder='Image Url'
            multiline
            name='img'
            value={img}
            onChange={(event) => handleChange(event, "img")}
            variant='outlined'
          />
          <Typography className={classes.icon} variant='h6' noWrap>
            C O N T E N T
          </Typography>
          <TextField
            style={{ width: "80vw" }}
            id='full-width-text-field'
            placeholder='Content'
            multiline
            name='content'
            value={content}
            onChange={(event) => handleChange(event, "content")}
            variant='outlined'
          />{" "}
          <br />
          <br />
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
      </Box>
    );

}


export default CreateBlogForm;


