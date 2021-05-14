import React from "react";
import UserBlogPreview from "../components/BlogViews/UserBlogPreview";

//Material UI
  import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 50,
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#d1c4e9",
    },
  },
}));

const BlogList = ({ blogs, handleDelete }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const columnMaker = (b) => {
    return (
      <Grid item xs={matches ? 16 : 4}>
        <UserBlogPreview key={b.id} handleDelete={handleDelete} blog={b} />
      </Grid>
    );
  };

  const rowMaker = (column) => {
    return (
      <Grid container justify='space-evenly' item xs={12} spacing={1}>
        {column}
      </Grid>
    );
  };

  const gridMaker = (b) => {
    let column = [];
    let row = [];

    for (let i = 0; i < b.length; i++) {
      column.push(columnMaker(b[i]));
      if (i % 3 === 0) {
        row.push(rowMaker(column));
        column = [];
      }
    }
    row.push(rowMaker(column));
    return row.reverse().map((blog) => <>{blog}</>);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {gridMaker(blogs)}
      </Grid>
    </div>
  );
};

export default BlogList;
