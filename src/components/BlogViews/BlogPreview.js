import React from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  IconButton,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  makeStyles,
  CardMedia,
} from "@material-ui/core/";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import YoutubeSearchedForOutlinedIcon from "@material-ui/icons/YoutubeSearchedForOutlined";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



const BlogPreview = ({ blog }) => {

  const classes = useStyles();

  const contentPreview = () => {
    const newContent = blog.content.split(" ");
    const preview = [];
    for (let i = 0; i < 20; i++) {
      preview.push(newContent[i]);
    }
    return preview.join(" ");
  };
    

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component={Link}
          to={`/blogs/${blog.id}`}
          className={classes.media}
          image={blog.img}
          title='Blog Header'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {blog.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {contentPreview()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton component={Link} to={`/blogs/${blog.id}`} aria-label='show'>
          <YoutubeSearchedForOutlinedIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`/blogs/${blog.id}/edit`}
          aria-label='edit'
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label='delete'>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton aria-label='love'>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </CardActions>
      <Link to={`/blogs/${blog.id}`} blog={blog}>
        {blog.title}
      </Link>
    </Card>
  );
};

export default BlogPreview;
