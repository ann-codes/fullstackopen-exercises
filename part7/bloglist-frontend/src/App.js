import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import MessageBlock from "./components/MessageBlock";
import Navigation from "./components/Navigation";
import UsersList from "./components/UsersList";
import UserStats from "./components/UserStats";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogPage from "./components/BlogPage";
import { initBlogs } from "./reducers/blogReducer";
import { initUsers } from "./reducers/usersReducer";
import { setUserByLocalStorage } from "./reducers/loginReducer";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
    dispatch(setUserByLocalStorage());
  }, [dispatch, blogs.length]);

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
            <Route exact path="/user/:id" component={UserStats} />
            <Route exact path="/blog-links" component={BlogList} />
            <Route exact path="/blog/:id" component={BlogPage} />
            <Route exact path="/" component={UsersList} />
          </Switch>
        </Fragment>
      )}
    </div>
  );
};

export default App;
