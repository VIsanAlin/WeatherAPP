import { useState } from "react";

const SearchBar = function ({ handleWeatherData, handleLatLonData }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Search value:", searchValue);
    // Fetch weather data using the search value
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=9ed4d0eab80ab31d905bafb34edf87da`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        handleWeatherData(data[0].name, data[0].country);
      });
  };

  return (
    <div>
      <form className="relative" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Search location"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 15l-5-5-5 5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
