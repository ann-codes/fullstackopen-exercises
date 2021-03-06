import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ show, updateCacheWith }) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    // keeping refetchQ to refetch author data, use custom for books
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
      // const dataInStore = store.readQuery({ query: ALL_BOOKS });
      // store.writeQuery({
      //   query: ALL_BOOKS,
      //   data: {
      //     ...dataInStore,
      //     allBooks: [...dataInStore.allBooks, response.data.addBook],
      //   },
      // });
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: {
        title: title.length > 0 ? title : null,
        published: published.length > 0 ? parseInt(published) : null,
        author: author.length > 0 ? author : null,
        genres: genres.length > 0 ? genres : null,
      },
    });

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.toLowerCase()));
    setGenre("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
