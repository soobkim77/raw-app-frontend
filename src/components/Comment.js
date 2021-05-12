import {Card, CardContent, Typography, makeStyles, IconButton} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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

    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography variant="body2" component="p"> 
                    {comment.attributes.user}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {comment.attributes.content}
                </Typography>
                <IconButton onClick={() => deleteCom(comment.id)}>
                  <DeleteOutlinedIcon/>
                </IconButton>
            </CardContent>
            
        </Card>
    )
}



export default Comment