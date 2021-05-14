import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));


const USERURL = "http://localhost:3000/users";

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
      <form
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
      </form>
    </>
  );
};

export default SignUp;
