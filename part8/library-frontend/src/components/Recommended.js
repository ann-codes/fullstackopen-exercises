import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, USER_INFO } from "../queries";

const Recommended = ({ show, token }) => {
  const [genre, setGenre] = useState(null);
  const [getUser, user] = useLazyQuery(USER_INFO);
  const [getBooks, books] = useLazyQuery(ALL_BOOKS);

  useEffect(() => { // ugh
    if (token) {
      getUser();
      const userData = user?.data?.me;
      if (userData) {
        setGenre(userData.favoriteGenre);
        if (genre) {
          getBooks({ variables: { genre } });
        }
      }
    }
  }, [token, getUser, user.data, genre, getBooks]);

  if (!show) {
    return null;
  }

  const mappedBooks = books?.data?.allBooks.map((a) => (
    <tr key={a.title}>
      <td>{a.title}</td>
      <td>{a.author.name}</td>
      <td>{a.published}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Recommended {genre[0].toUpperCase() + genre.slice(1)} Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {mappedBooks}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
