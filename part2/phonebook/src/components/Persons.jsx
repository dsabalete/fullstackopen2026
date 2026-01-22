import Person from "./Person";

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person person={person} handleDelete={handleDelete} key={person.id} />
      ))}
    </>
  );
};

export default Persons;
