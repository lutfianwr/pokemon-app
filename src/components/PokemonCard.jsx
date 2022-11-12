import React from "react";

const PokemonCard = (props) => {
  const { fetchDetail, name, id } = props;

  const errorHandler = (error) => {
    const img = document.getElementById("img");
    img.src = "https://example.com/dummy.jpg";
  };

  return (
    <div className="pokemon" onClick={() => fetchDetail()}>
      <img
        alt={name}
        src={
          id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            : `https://via.placeholder.com/250x250?text=Image+not+found`
        }
      />
      <p className="id">#{id}</p>
      <p className="name">{name}</p>
    </div>
  );
};

export default PokemonCard;
