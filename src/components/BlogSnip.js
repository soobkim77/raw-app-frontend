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

export default function BlogSnip({blog}) {
  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
          {blog.attributes.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {blog.attributes.user}
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {/* {blog.img === "" ? null : <img src={blog.img} alt="" />} */}
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={{pathname: `/blogs/${blog.id}`, state: {blog}}} >Read More</Link>
      </CardActions>
    </Card>
  );
}
