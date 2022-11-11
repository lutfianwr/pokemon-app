import React from "react";

const PokemonCard = (props) => {
  const { fetchDetail, name, id } = props;
  return (
    <div className="pokemon" onClick={() => fetchDetail()}>
      <p>{name}</p>
      <img
        alt={name}
        src={
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/poskemon/${id}.png`
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
          // : `https://via.placeholder.com/250x250?text=Image+not+found`
        }
      />
    </div>
  );
};

export default PokemonCard;
