import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notify, setNotify] = useState(null);
  const client = useApolloClient();

  // const login = (
  //   <div>
  //     <Notify errorMessage={errorMessage} />
  //     <LoginForm setToken={setToken} setError={notify} />
  //   </div>
  // );

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("library-token");
    if (loggedUserJSON) {
      const userToken = JSON.parse(loggedUserJSON);
      setToken(userToken.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("library-token");
    setToken(null);
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token ? (
          <button
            onClick={() => {
              handleLogout();
              setPage("authors");
            }}
          >
            logout
          </button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />

      <LoginForm
        setToken={setToken}
        setError={notify}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
