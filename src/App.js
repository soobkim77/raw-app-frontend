import React, { useState } from "react";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Router from "./pages/Router"



export default function App() {
  const [loggedIn, isLoggedIn] = useState(true);

  const loginHelper = () => {
    isLoggedIn(!loggedIn);
  };

  return (
    <>
      <Switch>
        {loggedIn && (
          <Route exact path='/'>
            <Login loginHelper={loginHelper} />
          </Route>
        )}
        <Route path='/blogs'>
          <Blogs loginHelper={loginHelper} />
        </Route>
        <Route exact path='/signup' component={SignUp} />
        <Router />
      </Switch>
    </>
  );
}
