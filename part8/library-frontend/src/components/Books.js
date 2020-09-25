import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import GenreButtons from "./GenreButtons";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(null);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      const genreLowercase = result.data.allBooks.map((b) => {
        return { ...b, genres: b.genres.map((g) => g.toLowerCase()) };
      });
      setBooks(genreLowercase);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const filteredBooks = filterBy
    ? books.filter((b) => b.genres.includes(filterBy))
    : books;

  const mappedBooks = filteredBooks.map((a) => (
    <tr key={a.title}>
      <td>{a.title}</td>
      <td>{a.author.name}</td>
      <td>{a.published}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Books</h2>
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
      <GenreButtons books={books} setFilterBy={setFilterBy} />
      <button onClick={() => setFilterBy(null)}>all genres</button>
    </div>
  );
};

export default Books;
