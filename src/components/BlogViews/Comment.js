import {Card, CardActions, Avatar, Grid, CardHeader, CardContent, Typography, makeStyles, IconButton} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React, {useState} from 'react';


const LIKEURL = "http://localhost:3000/likes"


const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 500,
    marginTop: ".5em",
    marginBottom: ".5em",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: "primary",
  },
  content: {
    marginLeft: "2em",
  },
  trash: {
    color: "#f44336",
    alignSelf: "right",
  },
  head: {
    marginTop: ".75em",
  },
  bot: {
    padding: "10px",
  },
  likes: {
    paddingLeft: "1em",
  },
  icon: {
    color: "#f44336",
  },
  icoff: {
    color: "primary",
  },
});


const Comment = ({comment, deleteCom}) => {
    const [commentLikes, setCommentLikes] = useState(comment.attributes.likes)
    // const [commentBoolean, setCommentBoolean] = useState(false)
    const [likedComment, setLikedComment] = useState(false)

  const classes = useStyles();
  
  
    const newLikeComment = (commentID) => {
      const body = {
          likeable_id: commentID,
          likeable_type: "Comment"
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
      .then(res => {
        if(res.message){
          setLikedComment(true)
          setTimeout(()=>setLikedComment(false), 3000)
        } else {
          // setCommentBoolean(true)
          setCommentLikes(commentLikes + 1)
        }
      })
  }

    return (
      <Card className={classes.root} variant='outlined'>
        <CardHeader
          className={classes.head}
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {comment.attributes.user[0] || "R"}
            </Avatar>
          }
          title={comment.attributes.user}
          subheader={comment.attributes.created_at.split("T")[0]}
        />
        <CardContent className={classes.bot}>
          <Typography
            className={classes.content}
            color='textPrimary'
            gutterBottom
          >
            {comment.attributes.content}
          </Typography>
          <CardActions>
            <Grid container>
              <Grid item xs={12} sm={10} className={classes.likes}>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  {commentLikes}{" "}
                  {likedComment ? (
                    <IconButton onClick={() => newLikeComment(comment.id)}>
                      <ThumbUpIcon className={classes.icon} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => newLikeComment(comment.id)}>
                      <ThumbUpIcon className={classes.icoff} />
                    </IconButton>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton
                  className={classes.trash}
                  onClick={() => deleteCom(comment.id)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </CardContent>
      </Card>
    );
}



export default Comment