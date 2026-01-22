import { useState, useEffect } from "react";
import personService from "./services/persons.js";

import FilterField from "./components/FilterField";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const updatedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p)),
            );
            resetInputs();
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      resetInputs();
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()),
  );

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

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

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
