import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { pokemon_name } = useParams();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`
    );
    const pokemon = await response.json();
    setPokemon(pokemon);
    console.log(pokemon);
  };

  return (
    <div onClick={() => console.log(pokemon_name)}>
      <p>{pokemon_name}</p>
      <img
        alt={pokemon_name}
        src={
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
            : `https://via.placeholder.com/250x250?text=Image+not+found`
        }
      />
    </div>
  );
};

export default Detail;
