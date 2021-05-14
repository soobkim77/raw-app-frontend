import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#f44336",
  },
  icon: {
    color: "#f44336",
  },
  icoff: {
    color: "primary",
  },
}));

export default function DisplayBlog({ blog: { content, title, user, id, created_at }, likes }) {
  
  const [heart, isHeart] = useState();
  const [thumb, isThumb] = useState();
  const [like, setLike] = useState(1);
  const classes = useStyles();


  const likeHelper = () => {
    isHeart(true);
    isThumb(false);
    setLike(like + 1);
  }
  const thumbHelper = () => {
    isHeart(false);
    isThumb(true);
    setLike(like -1)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {user[0] || "R"}
          </Avatar>
        }
        title={user}
        subheader='September 14, 2016'
      />
      <CardMedia
        className={classes.media}
        image={"https://picsum.photos/600/600"}
        title='blog header'
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {created_at.split("T")[0]}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {like} likes
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='like blog' onClick={() => likeHelper()}>
          {heart ? (
            <FavoriteIcon className={classes.icon} />
          ) : (
            <FavoriteIcon className={classes.icoff} />
          )}
        </IconButton>
        <IconButton aria-label='like blog' onClick={() => thumbHelper()}>
          {thumb ? (
            <ThumbDownIcon className={classes.icon} />
          ) : (
            <ThumbDownIcon className={classes.icoff} />
          )}
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant='h3'>{title}</Typography>
        <Typography paragraph>{content}</Typography>
      </CardContent>
    </Card>
  );
}
