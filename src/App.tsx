import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import { Pokemon, PokemonDetail } from './types';
import './index.css';

const pokeApi = {
    getPokemons: async () => {
        const limit = 1000;
        let offset = 0;
        let allPokemons: Pokemon[] = [];

        try {
            while (offset < limit) {
                const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=100`;
                const response = await axios.get(url);
                const pokemons = response.data.results;
                const pokemonDetails = await Promise.all(pokemons.map(pokeApi.getPokemonDetail));
                allPokemons = [...allPokemons, ...pokemonDetails.filter(p => p !== null)];
                offset += 100;
            }
            return allPokemons;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getPokemonDetail: async (pokemon: { url: string }) => {
        try {
            const response = await axios.get(pokemon.url);
            const pokeDetail: PokemonDetail = response.data;
            
            // Verifica se há um gif disponível até o número 706
            if (pokeDetail.id > 706) {
                console.warn(`Gif não encontrado para ${pokeDetail.name}. Ignorando...`);
                return null;
            }
            
            const pokemonData: Pokemon = {
                id: pokeDetail.id,
                number: pokeDetail.id.toString().padStart(3, '0'),
                name: pokeDetail.name,
                type: pokeDetail.types[0].type.name,
                types: pokeDetail.types.map((typeSlot) => typeSlot.type.name),
            };
            return pokemonData;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

const App: React.FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        pokeApi.getPokemons().then((pokemons) => {
            setAllPokemons(pokemons);
            setPokemon(pokemons[Math.floor(Math.random() * pokemons.length)]);
        });
    }, []);

    const handleRandomize = () => {
        const pokemonWithGif = allPokemons.filter(p => p.id <= 706); // Considerando até o Pokémon número 706
        const randomPokemon = pokemonWithGif[Math.floor(Math.random() * pokemonWithGif.length)];
        setPokemon(randomPokemon);
    };

    const handleSearch = (query: string) => {
        const foundPokemon = allPokemons.find((p) => p.name.toLowerCase() === query.toLowerCase());
        if (foundPokemon) {
            setPokemon(foundPokemon);
        }
    };

    return (
        <div className="app-container mx-auto p-4">
            <SearchBar onSearch={handleSearch} />
            {pokemon && <PokemonCard pokemon={pokemon} />}
            <div className="flex justify-center mt-4">
                <button 
                    onClick={handleRandomize} 
                    className="px-4  top-4 rounded-lg bg-blue-500 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
                >Buscar Pokémon
                </button>
            </div>
        </div>
    );
};

export default App;
