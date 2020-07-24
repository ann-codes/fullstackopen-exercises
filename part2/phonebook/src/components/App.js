import React, { useState, useEffect } from "react";
import axiosSvs from "./services/axiosService";

import InputField from "./InputField";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });

  const [filter, setFilter] = useState("");

  const fetchData = () => {
    axiosSvs.getAll().then((response) => setPersons(response.data));
  };

  useEffect(fetchData, []);

  const handleNameFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName({ ...newName, [e.target.name]: e.target.value });
  };

  const submitData = (e) => {
    e.preventDefault();

    const findName = persons.find(
      (person) => person.name.toLowerCase() === newName.name.toLowerCase()
    );

    if (findName) {
      const confirmEdit = window.confirm(
        `${findName.name} is already in the Phonebook. Do you want to replace their number?`
      );

      if (confirmEdit) {
        axiosSvs
          .update(findName.id, newName)
          .then((response) => {
            const filterEdited = persons.filter(
              (person) => person.id !== findName.id
            );
            setPersons([...filterEdited, response.data]);
            setNewName({ name: "", number: "" });
          })
          .catch((error) => console.log(`ERROR ====> ${error}`));
      }
    } else {
      axiosSvs
        .create({ ...newName, id: persons[persons.length - 1].id + 1 })
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName({ name: "", number: "" });
        })
        .catch((error) => {
          console.log("Error at ", error);
        });
    }
  };

  const deleteData = (e) => {
    const id = Number(e.target.getAttribute("data-id"));
    const filteredDeleted = persons.filter((person) => person.id !== id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${e.target.getAttribute("data-name")}?`
    );
    if (confirmDelete) {
      axiosSvs.deleteItem(id);
      setPersons(filteredDeleted);
    }
  };

  const filteredBook = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const mapPhonebook = filteredBook
    .sort((a, b) => a.id - b.id)
    .map((person) => (
      <li key={person.id}>
        {person.name}: {person.number}{" "}
        <button
          data-id={person.id}
          data-name={person.name}
          onClick={deleteData}
        >
          Delete
        </button>
      </li>
    ));

  return (
    <div>
      <h1>PhoneBook</h1>
      <InputField
        title="filter shown with"
        inputName="filterName"
        inputValue={filter}
        handleChange={handleNameFilter}
      />
      <h2>Add New</h2>
      <form onSubmit={submitData}>
        <div>
          <InputField
            title="name"
            inputName="name"
            inputValue={newName.name}
            handleChange={handleNameChange}
          />
          <InputField
            title="number"
            inputName="number"
            inputValue={newName.number}
            handleChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.length > 0 ? mapPhonebook : "No entries in the phonebook!"}
      </ul>
    </div>
  );
};

export default App;
