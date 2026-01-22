const FilterField = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={filter}
        onChange={(event) => handleFilterChange(event.target.value)}
      />
    </div>
  );
};

export default FilterField;
