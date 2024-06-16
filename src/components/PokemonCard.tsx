import React from "react";
import { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card flex items-center justify-center relative">
      <div
        className={`pokemon ${pokemon.type} p-2 rounded-lg relative flex flex-col justify-between max-w-sm bg-white shadow-md transition duration-300 ease-in-out transform space-y-4`}
      >
        <div className="pokeinfo text-center">
          <span className="name font-bold text-xl capitalize">
            {pokemon.name}
          </span>
          <span className="number"> #{pokemon.number}</span>
          <ol className="types flex mt-2 justify-center">
            {pokemon.types.map((type) => (
              <li
                key={type}
                className="type bg-white font-bold bg-opacity-80 px-5 py-1 m-1 rounded-full text-base"
              >
                {type}
              </li>
            ))}
          </ol>
        </div>
        <div className="pokeimg flex justify-center">
          <img
            src={`/src/img/pokemons/poke_${pokemon.id}.gif`}
            alt={pokemon.name}
            className="poke-image relative top-0 left-3/4  transform -translate-x-1/2"
          />

          {/* Imagem criada abaixo para gerar um espaço do card com opacity-0 */}
          <img
            className="imgbackground opacity-0 invert w-96 transform rotate-45"
            src="https://pokemoncalc.web.app/en/assets/pokeball.svg"
            alt={`${pokemon.name}`}
          />

          {/* Imagem lateral com 0.5 de opacity */}
          <img
            className="imgbackground opacity-50 invert w-52 transform rotate-45"
            src="https://pokemoncalc.web.app/en/assets/pokeball.svg"
            alt={`${pokemon.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
