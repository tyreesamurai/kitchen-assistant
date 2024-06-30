export default function SearchBar() {
  return (
    <div className="flex">
      <div className="Search"></div>
      {/* TODO: Add ComboBox for these filters. */}
      <div className="Category-Filter"></div>
      <div className="Cuisine-Filter"></div>
      {/* TODO: This one probably can't be a combobox but figure out something for this. */}
      <div className="CookTime-Filter"></div>
    </div>
  );
}
