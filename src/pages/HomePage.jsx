import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const Homepage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 30;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();
  }, [page]);

  const toDetail = (name) => {
    navigate(`detail/${name}`);
  };

  const fetchPokemon = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const { results } = await response.json();
    setPokemon(results);
  };

  const nextPage = () => {
    setOffset(offset + limit);
    setPage(page + 1);
  };

  const previousPage = () => {
    setOffset(offset - limit);
    setPage(page - 1);
  };

  const toPage = (value) => {
    if (page > 0) {
      setOffset(offset + value * limit);
    } else {
      setOffset(offset - value * limit);
    }
    setPage(value + page);
  };

  const handleSearch = async (input) => {
    input.preventDefault();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (response.status === 200) {
      const pokemon = await response.json();
      setPokemon(pokemon);
    } else {
      setPokemon(0);
    }
  };

  return (
    <div className="Homepage">
      <form className="search" onSubmit={(input) => handleSearch(input)}>
        <input
          placeholder="search pokemon name"
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <div className="container">
        {pokemon.length > 1 &&
          pokemon.map((poke, index) => (
            <PokemonCard
              key={index}
              name={poke.name}
              id={index + 1 + offset}
              fetchDetail={() => toDetail(poke.name)}
            />
          ))}
        {pokemon.name && (
          <PokemonCard
            name={pokemon.name}
            id={pokemon.id}
            fetchDetail={() => toDetail(pokemon.name)}
          />
        )}
        {pokemon === 0 && <div>no pokemon found</div>}
      </div>

      <div className="pagination">
        <p href="/" onClick={() => previousPage()} hidden={page < 2}>
          &lsaquo;
        </p>
        <p href="/" onClick={() => toPage(-2)} hidden={page < 3}>
          {page - 2}
        </p>
        <p href="/" onClick={() => toPage(-1)} hidden={page < 2}>
          {page - 1}
        </p>
        <p className="active" href="/">
          {page}
        </p>
        <p href="/" onClick={() => toPage(1)} hidden={page > 29}>
          {page + 1}
        </p>
        <p href="/" onClick={() => toPage(2)} hidden={page > 28}>
          {page + 2}
        </p>
        <p href="/" onClick={() => nextPage()} hidden={page > 29}>
          &rsaquo;
        </p>
      </div>
    </div>
  );
};

export default Homepage;
