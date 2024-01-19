import React, { useEffect, useState, useRef } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";
import styles from "./search.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const responseData = await response.json();
    return responseData.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));
  };

  const handleOnChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const options = await loadOptions(search);
      setSuggestions(options);
    };

    const timeoutId = setTimeout(fetchSuggestions, 600);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSelect = (selectedOption) => {
    setSearch(selectedOption.label);
    onSearchChange(selectedOption);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef}>
        <div className={styles.inputSection}>
          <div className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for a city"
              value={search}
              onChange={handleOnChange}
              className={styles.searchInput}
            />
          </div>
          {suggestions.length > 0 && (
            <ul className={styles.suggestionList}>
              {suggestions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={styles.suggestionItem}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
