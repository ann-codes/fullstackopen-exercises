import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [isDupe, setIsDupe] = useState(false);

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setIsDupe(false);
    setNewName(e.target.value);
  };

  const submitName = (e) => {
    e.preventDefault();

    const findName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (findName) {
      setIsDupe(true);
    } else {
      setPersons([...persons, { name: newName }]);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={submitName}>
        <div>
          <p>
            {isDupe ? `${newName} is a Duplicate! Try again!` : "Add a Name:"}
          </p>
          <p>
            name: <input value={newName} onChange={handleNameChange} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
