import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [pokemonOptions, setPokemonOptions] = useState<string[]>([]);

  const fetchPokemonNames = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      if (!response.ok) {
        throw new Error("Rede sem resposta.");
      }
      const data = await response.json();
      const pokemonNames = data.results.map((pokemon: any) => pokemon.name);
      setPokemonOptions(pokemonNames);
    } catch (error) {
      console.error("Erro ao buscar o nome do Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemonNames();
  }, []);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : pokemonOptions.filter(
          (pokemon) =>
            pokemon.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    setQuery(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  const inputProps = {
    placeholder: "Search Pokémon",
    value: query,
    onChange: onChange,
    className:
      "search-input px-4 py-2 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white flex-grow",
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => (
    <div {...containerProps} className="suggestions-container">
      {children}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center mb-4 w-full max-w-12 mx-auto"
    >
      <div className="flex flex-grow items-center relative">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => (
            <div className="suggestion-item">{suggestion}</div>
          )}
          inputProps={inputProps}
          renderSuggestionsContainer={renderSuggestionsContainer}
        />
      </div>
      <button
        type="submit"
        className="flex-none px-4 rounded-r-lg bg-blue-500 text-white font-bold p-2 uppercase border-blue-500 border"
        style={{ width: "100px" }}
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
