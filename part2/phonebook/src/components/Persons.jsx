import Person from "./Person";

const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </>
  );
};

export default Persons;
