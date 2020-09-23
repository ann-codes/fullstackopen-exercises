import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorBorn, setAuthorBorn] = useState("");
  const [updateAuthor, resultUpdate] = useMutation(EDIT_AUTHOR);
  const resultAll = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (resultAll.data) {
      setAuthors(resultAll.data.allAuthors);
    }
  }, [resultAll.data]);

  useEffect(() => {
    if (resultUpdate.data && !resultUpdate.data.editAuthor) {
      console.error("NAME NOT FOUND");
    }
  }, [resultUpdate.data]);

  const updateAuthorSubmit = async (e) => {
    e.preventDefault();
    updateAuthor({
      variables: { name: authorName.value, setBornTo: parseInt(authorBorn) },
    });
    setAuthorName("");
    setAuthorBorn("");
  };

  if (!props.show) {
    return null;
  }

  if (resultAll.loading) {
    return <div>loading...</div>;
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Year Born</th>
            <th>Book Count</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={updateAuthorSubmit}>
        <div style={{ width: "250px" }}>
          Name:{" "}
          <Select
            defaultValue={authorName}
            onChange={setAuthorName}
            options={options}
          />
        </div>
        <div>
          Born:{" "}
          <input
            type="number"
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
