import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    }
  },
  root2: {
    height: '100vh',
  },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
}));

const USERURL = "http://localhost:3000/users";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3001/">
        RAW
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUp = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (event, type) => {
    let stateMap = {
      username: (event) => setUsername(event.target.value),
      password: (event) => setPassword(event.target.value),
    };
    stateMap[type](event);
  };

  const createUser = (e) => {
    e.preventDefault();
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password
        },
      }),
    };
    fetch(USERURL, configObj)
      .then((r) => r.json())
      .then();

    e.target.reset();
  };

  const handleSubmit = (event) => {
    createUser(event);
    history.push("/");
  }

  return (
    <>
      <Grid container component='main' className={classes.root2}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountBoxIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Create an Account
            </Typography>
            <form
              className={classes.form}
              id='login'
              noValidate
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(event) => handleChange(event, "username")}
                id='username'
                label='Username'
                name='username'
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                onChange={(event) => handleChange(event, "password")}
                id='password'
                label='Password'
                type='password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Create an Account
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      {/* <form
        className={classes.root}
        id='login'
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          onChange={(event) => handleChange(event, "username")}
          id='username'
          label='Username'
          variant='outlined'
          value={username}
        />
        <TextField
          onChange={(event) => handleChange(event, "password")}
          id='password'
          label='Password'
          variant='outlined'
          value={password}
        />
        <Button type='Submit' variant='outlined' form='login' color='primary'>
          Sign Up!
        </Button>
      </form> */}
    </>
  );
};

export default SignUp;
