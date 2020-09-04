import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MessageBlock from "./components/MessageBlock";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Navigation from "./components/Navigation";
import UsersList from "./components/UsersList";
import { initBlogs } from "./reducers/blogReducer";
import { initUsers } from "./reducers/usersReducer";
import { setUserByLocalStorage } from "./reducers/loginReducer";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
    dispatch(setUserByLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <h1>Blog List App</h1>
      <MessageBlock />
      {!user.token ? (
        <LoginForm />
      ) : (
        <Fragment>
          <Navigation user={user} />
          <Switch>
            <Route exact path="/users" component={UsersList} />
            <Route path="/user/:id">
              <p>HELLO</p>
            </Route>
            <Route exact path="/blog-links">
              <Togglable LabelOff="Cancel Add" LabelOn="Add New Blog">
                <BlogForm user={user} />
              </Togglable>
              <BlogList />
            </Route>
            <Route exact path="/" component={UsersList} />
          </Switch>
        </Fragment>
      )}
    </div>
  );
};

export default App;
