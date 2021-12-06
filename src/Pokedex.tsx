import { useEffect, useState } from 'react';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
      const { results } = await res.json();
      const pokedex = results.map((pokemon: any, index: number) => {
        const paddedId = ('00' + (index + 1)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return { ...pokemon, image };
      });
      setPokemon(pokedex);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {pokemon.map((pokemon: any, index: number) => (
        <li key={index}>
          <a href={`/pokedex?id=${index + 1}`}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>
              {index + 1}.<span>{pokemon.name}</span>
            </p>
          </a>
        </li>
      ))}
    </div>
  );
};

export default Pokedex;
