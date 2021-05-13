import React from 'react'
import EditBlogForm from "../components/BlogForms/EditBlogForm";
import CreateBlogForm from "../components/BlogForms/CreateBlogForm";
import { Switch, Route } from "react-router-dom";
import MainBlog from "../components/BlogViews/MainBlog";
import BlogList from "../containers/BlogList";
import Error from "./Error";
import Profile from "./Profile"
import Home from "./Home"
import Login from "./Login"
import SignUp from "./SignUp"

export default function Router({blogs}) {
    return (
      <>
        <Switch>
          {/* <Route path='/login' component={Login} /> */}
          <Route
            exact
            path='/blogs'
            render={(routerProps) => (
              <BlogList {...routerProps} blogs={blogs} />
            )}
          />
          <Route exact path='/blogs/create' component={CreateBlogForm} />
          <Route path='/blogs/:id' children={<MainBlog />} />
          <Route
            path='/blogs/:id/edit'
            component={
              <EditBlogForm />
            }
          ></Route>
          <Route path='/profile' component={Profile} /> 
          {/* <Route path='/login' component={Login} /> */}
          <Route path='/signup' component={SignUp} />
          <Route path='/home' component={Home} />
          {/* <Route exact path='/' component={Login}/> */}
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </>
    );
}
