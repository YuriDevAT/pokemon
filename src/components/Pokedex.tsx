import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollArrow from './ScrollArrow';

const Pokedex = () => {

  interface IPokedex {
    name: string;
    image: string;
  }
  const eachFetch: number = 50;

  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState(eachFetch);
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

  const handleMoreButton = () => {
    setNext(next + eachFetch);
  };

  return (
    <div className='pokedex'>
      {loading ? (
        <div role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </div>
      ) : (
        <>
          <div className="pokedex__col">
            {pokemon.slice(0, next).map((pokemon: IPokedex, index: number) => (
              <div className='pokedex__card'>
                <Link to={`/pokemon/${index + 1}`} className='pokedex__link'>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    width='180'
                    height='180'
                    className="pokedex__image"
                  />
                  #{(index + 1).toString().padStart(3, '0')}
                  <br />
                  {pokemon.name}
                </Link>
              </div>
            ))}
          </div>
          {next < pokemon.length && (
            <button type="button" className="button-more" onClick={handleMoreButton}>
              Catch more pokemon &#9863;
            </button>
          )}
        </>
      )}
      <ScrollArrow />
    </div>
  );
};

export default Pokedex;
