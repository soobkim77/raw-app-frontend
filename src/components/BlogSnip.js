import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';

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

        <Typography variant="h5" component="h2">
          {props.blog.attributes.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.blog.attributes.user}
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {/* {blog.img === "" ? null : <img src={blog.img} alt="" />} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/blogs/${props.blog.id}`} onClick={() => props.showBlog(props.blog)}>Read More</Link>
      </CardActions>
    </Card>
  );
}
