import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const Homepage = () => {
  const [pokemon, setPokemon] = useState([]);
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
    console.log(results);
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

    console.log(value);
  };

  return (
    <div className="Homepage">
      <div className="container">
        {pokemon.map((poke, index) => (
          <PokemonCard
            key={index}
            name={poke.name}
            id={index + 1 + offset}
            fetchDetail={() => toDetail(poke.name)}
          />
        ))}
      </div>

      <div className="pagination">
        <p href="/" onClick={() => previousPage()} hidden={page < 2}>
          &laquo;
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
          &raquo;
        </p>
      </div>
    </div>
  );
};

export default Homepage;
