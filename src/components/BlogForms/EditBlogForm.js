import React, { useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
/*  Material UI  */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";



const EditBlogForm = ({ blog: {attributes: { content, img, title },id}, handleSubmit}) => {
  const classes = useStyles();
  const [tle, setTitle] = useState(title);
  const [con, setContent] = useState(content);
  const [image, setImage] = useState(img);
  let history = useHistory();

  const handleChange = (event, type) => {
    let stateMap = {
      title: (event) => setTitle(event.target.value),
      content: (event) => setContent(event.target.value),
      img: (event) => setImage(event.target.value),
    };
    stateMap[type](event);
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          handleSubmit(e, tle, con, image, id);
           history.push("/blogs/");
          //submitHelper();
        }}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        <TextField
          placeholder='Title'
          multiline
          value={tle}
          onChange={(event) => handleChange(event, "title")}
          variant='outlined'
        />
        <TextField
          placeholder='Content'
          multiline
          value={con}
          onChange={(event) => handleChange(event, "content")}
          variant='outlined'
        />
        <TextField
          placeholder='Image Url'
          multiline
          value={image}
          onChange={(event) => handleChange(event, "img")}
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
