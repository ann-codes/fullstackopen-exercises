import React, { useState, useEffect } from "react";
import axiosSvs from "./services/axiosService";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [isDupe, setIsDupe] = useState(false);
  const [filter, setFilter] = useState("");

  const fetchData = () => {
    axiosSvs.getAll().then((response) => setPersons(response.data));
  };

  useEffect(fetchData, []);

  const handleNameFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setIsDupe(false);
    setNewName({ ...newName, [e.target.name]: e.target.value });
  };

  const submitData = (e) => {
    e.preventDefault();

    const findName = persons.find(
      (person) => person.name.toLowerCase() === newName.name.toLowerCase()
    );

    if (findName) {
      setIsDupe(true);
    } else {
      axiosSvs.create({ ...newName, id: persons.length + 1 });
      setPersons([...persons, newName]);
      setNewName({ name: "", number: "" });
    }
  };

  const filteredBook = persons.filter((person) => person.name.includes(filter));

  const mapPhonebook = filteredBook.map((person, i) => (
    <li key={i}>
      {person.name}: {person.number}
    </li>
  ));

  return (
    <div>
      <h1>PhoneBook</h1>
      <p>
        filter shown with:{" "}
        <input name="filterName" value={filter} onChange={handleNameFilter} />
      </p>
      <h2>Add New</h2>
      <form onSubmit={submitData}>
        <div>
          <p>
            {isDupe
              ? `${newName.name} is a Duplicate! Try again!`
              : "Add a Name and Number:"}
          </p>
          <p>
            name:{" "}
            <input
              name="name"
              value={newName.name}
              onChange={handleNameChange}
            />
          </p>
          <p>
            number:{" "}
            <input
              name="number"
              value={newName.number}
              onChange={handleNameChange}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{mapPhonebook}</ul>
    </div>
  );
};

export default App;
