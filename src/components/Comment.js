import {Card, CardContent, Typography, makeStyles, IconButton} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React, {useState} from 'react';

const LIKEURL = "http://localhost:3000/likes"

const useStyles = makeStyles({
    root: {
      minWidth: 275,
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


const Comment = ({comment, deleteCom}) => {
    const [commentLikes, setCommentLikes] = useState(comment.attributes.likes)
    const [commentBoolean, setCommentBoolean] = useState(false)
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
        } else {
          setCommentBoolean(true)
          setCommentLikes(commentLikes + 1)
        }
      })
  }

    return (
        <Card>
            <CardContent>
                <Typography variant="body2" component="p"> 
                    {comment.attributes.user}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {comment.attributes.content}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {commentLikes} <IconButton onClick={() => newLikeComment(comment.id)}><ThumbUpIcon/></IconButton> 
                    {likedComment ? <p>You've already liked this comment </p> : null}
                </Typography>
                {commentBoolean ? null : <button> </button>}
                <IconButton onClick={() => deleteCom(comment.id)}>
                  <DeleteOutlinedIcon/>
                </IconButton>
            </CardContent>
            
        </Card>
    )
}



export default Comment