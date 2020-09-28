import React, { useState, useEffect, Fragment } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  // const [notify, setNotify] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);

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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const addedBook = subscriptionData.data.bookAdded;
      alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

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
          <Fragment>
            <button
              onClick={() => {
                setPage("recommended");
              }}
            >
              recommended
            </button>
            <button
              onClick={() => {
                handleLogout();
                setPage("authors");
              }}
            >
              logout
            </button>
          </Fragment>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />
      <Recommended show={page === "recommended"} token={token} />
      <LoginForm setToken={setToken} show={page === "login"} />
    </div>
  );
};

export default App;
