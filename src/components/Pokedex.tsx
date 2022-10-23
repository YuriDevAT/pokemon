import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollArrow from './ScrollArrow';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokedex();
  }, []);

  const getPokedex = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=905');
      const { results } = await res.json();
      const pokedex = results.map((pokemon: any, index: number) => {
        const paddedId = ('00' + (index + 1)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return { ...pokemon, image };
      });
      setPokemon(pokedex);
      setLoading(false);
    } catch (err) {
      <div role='status'>
        <span className='visually-hidden'>An error occurred.</span>
      </div>
    }
  };

  /** TO DO
   * Only load the first 25 pokemon, then load more as the user scrolls or load more button
   */

  return (
    <div className='pokedex'>
      {loading ? (
        <div role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </div>
      ) : (
        <>
          <div className="pokedex__col">
            {pokemon.map((pokemon: { image: string, name: string }, index: number) => (
              <div className='pokedex__card'>
                <Link to={`/pokemon/${index + 1}`} className='pokedex__link'>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    width='180'
                    height='180'
                    loading="lazy"
                  />
                  <div>
                    <p>
                      #{(index + 1).toString().padStart(3, '0')}
                    </p>
                    <h2>{pokemon.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button type="button">Catch more pokemon</button>
        </>
      )}
      <ScrollArrow />
    </div>
  );
};

export default Pokedex;
