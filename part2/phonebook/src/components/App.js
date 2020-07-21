import React, { useState } from "react";

const App = () => {
  const defaultPersons = [
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ];

  const [persons, setPersons] = useState(defaultPersons);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [isDupe, setIsDupe] = useState(false);
  const [filter, setFilter] = useState("");

  const handleNameFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setIsDupe(false);
    setNewName({ ...newName, [e.target.name]: e.target.value });
  };

  const submitName = (e) => {
    e.preventDefault();

    const findName = persons.find(
      (person) => person.name.toLowerCase() === newName.name.toLowerCase()
    );

    if (findName) {
      setIsDupe(true);
    } else {
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
      <form onSubmit={submitName}>
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
