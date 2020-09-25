import React from "react";

const GenreButtons = ({ books, setFilterBy }) => {
  const genres = books.reduce((list, book) => {
    book.genres.forEach((gen) => {
      if (!list.includes(gen)) {
        list.push(gen);
      }
    });
    return list.sort();
  }, []);

  const genreButtons = genres.map((gen) => (
    <button key={gen} onClick={() => setFilterBy(gen)}>
      {gen}
    </button>
  ));

  return <>{genreButtons}</>;
};

export default GenreButtons;
