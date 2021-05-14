import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root2: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://static0.srcdn.com/wordpress/wp-content/uploads/2020/06/Gordon-Ramsay-Its-Raw.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "right",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#212121",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "#212121",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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
const SESHURL = "http://localhost:3000/sessions";

const Login = (props) => {
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

  const handleLogin = (e) => {
    e.preventDefault();
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    };

    fetch(SESHURL, configObj)
      .then((r) => r.json())
      .then((resp) => userHelper(resp));
  };

  const userHelper = (resp) => {
    setUsername("");
    setPassword("");
    window.localStorage.setItem("jwt", resp.jwt);
    props.loginHelper()
    history.push('/blogs')
  };

  return (
    <>
      <Grid container component='main' className={classes.root2}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form
              className={classes.form}
              id='login'
              noValidate
              onSubmit={(e) => handleLogin(e)}
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
               Log In
              </Button>
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
                color='#212121'
                label='Password'
                type='password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='#212121'
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/signup' variant='body2'>
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
    </>
  );
};

export default Login;
