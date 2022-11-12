import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/detail.css";
import Lottie from "lottie-react";
import hourglass from "../assets//loading.json";

const Detail = () => {
  const { pokemon_name } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`
    );
    const pokemon = await response.json();
    setPokemon(pokemon);
    setLoading(false);
  };

  if (loading) {
    return <Lottie className="lottie" animationData={hourglass} loop={true} />;
  } else {
    return (
      <div className="detail">
        <div className="left-content">
          <img
            alt={pokemon_name}
            src={
              pokemon.id
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                : `https://via.placeholder.com/250x250?text=Image+not+found`
            }
          />
          <p className="id">#{pokemon.id}</p>
          <p className="name">{pokemon_name}</p>
          <div className="types">
            {pokemon.types &&
              pokemon.types.map((type, index) => (
                <p className={type.type.name} key={index}>
                  {type.type.name}
                </p>
              ))}
          </div>
        </div>

        <div>
          <div className="abilities">
            <span>Abilities</span>
            <div className="ability">
              {pokemon.abilities &&
                pokemon.abilities.map((ability, index) => (
                  <p key={index}>•{ability.ability.name}</p>
                ))}
            </div>
          </div>
          <span>Height</span>
          <p className="height"> {(pokemon.height * 0.1).toFixed(1)} m</p>
          <div className="status">
            <div>
              <span>Status</span>
              {pokemon.stats &&
                pokemon.stats.map((stat, index) => (
                  <div key={index}>
                    <p>
                      {stat.stat.name} {stat.base_stat}
                    </p>
                    <meter
                      value={stat.base_stat}
                      min="0"
                      max="200"
                      key={index}
                    ></meter>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
