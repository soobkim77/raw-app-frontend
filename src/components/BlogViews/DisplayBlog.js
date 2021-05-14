import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


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
    backgroundColor: "#1769aa",
  },
}));

export default function DisplayBlog({
  blog: { img, content, title, user, id, created_at},
  like,
  likes,
  likeBool,
  unlike,
  unlikeBool
}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          {likes} likes
          {likeBool? <p>You've already liked this post!</p> : null}
          {unlikeBool? <p>You haven't like this post yet!</p> : null}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='like blog' onClick={() => like()}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='like blog' onClick={() => unlike(id)}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='h3'>{title}</Typography>
          <Typography paragraph>{content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
