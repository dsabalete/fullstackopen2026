import { useState, useEffect } from "react";
import axios from "axios";

import FilterField from "./components/FilterField";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const resetInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName) {
      alert("Name cannot be empty");
      return;
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      resetInputs();
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    resetInputs();
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterField filter={newFilter} handleFilterChange={setNewFilter} />

      <h3>Add a new contact</h3>

      <PersonForm
        handleSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
