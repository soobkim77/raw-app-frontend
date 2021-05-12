import React from 'react';
import { Link } from 'react-router-dom'
//Material UI
import {
  Typography,
  IconButton,
  CardContent,
  CardActions,
  Card,
  makeStyles,
} from "@material-ui/core/";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import YoutubeSearchedForOutlinedIcon from "@material-ui/icons/YoutubeSearchedForOutlined";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BlogSnip(props) {
  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {props.blog.attributes.title}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {props.blog.attributes.user}
        </Typography>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {/* {blog.img === "" ? null : <img src={blog.img} alt="" />} */}
        </Typography>
      </CardContent>

      <CardActions>
        {/* <Link
          to={`/blogs/${props.blog.id}`}
          onClick={() => props.showBlog(props.blog)}
        >
          Read More
        </Link> */}
        <IconButton
          component={Link}
          to={`/blogs/${props.blog.id}`}
          aria-label='show'
        >
          <YoutubeSearchedForOutlinedIcon
            onClick={() => props.showBlog(props.blog)}
          />
        </IconButton>
        <IconButton aria-label='edit'>
          <EditIcon />
        </IconButton>
        <IconButton aria-label='delete'>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton aria-label='love'>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
