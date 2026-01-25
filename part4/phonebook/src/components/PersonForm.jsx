const PersonForm = ({
  handleSubmit,
  name,
  number,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={name}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={number}
          maxLength={12}
          type="tel"
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
