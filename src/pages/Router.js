import React from "react";
import EditBlogForm from "../components/BlogForms/EditBlogForm";
import CreateBlogForm from "../components/BlogForms/CreateBlogForm";
import { Switch, Route } from "react-router-dom";
import MainBlog from "../components/BlogViews/MainBlog";
import BlogList from "../containers/BlogList";
import Error from "./Error";
import Profile from "./Profile";
import Home from "./Home";
import SignUp from "./SignUp";

export default function Router({ blogs, edit }) {
  return (
    <>
      <Switch>
        <Route
          exact
          path='/blogs'
          render={(routerProps) => <BlogList {...routerProps} blogs={blogs} />}
        />
        <Route exact path='/blogs/create' component={CreateBlogForm} />
        <Route exact path='/blogs/:id' children={<MainBlog />} />
        <Route
          exact
          path='/blogs/:id/edit'
          render={(routerProps) => <EditBlogForm {...routerProps} edit={edit} />}
        ></Route>
        <Route path='/profile' component={Profile} />
        <Route path='/signup' component={SignUp} />
        <Route path='/home' component={Home} />
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </>
  );
}
