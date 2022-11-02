import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollArrow from './ScrollArrow';
import { getPokedex } from '../utils/getPokedex';
import IPokedex from '../interfaces/IPokedex';
import { LoadButton } from './LoadButton';

const Pokedex = () => {
  const eachFetch: number = 50;

  const [pokedex, setPokedex] = useState([]);
  const [next, setNext] = useState(eachFetch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPokedex = async () => {
      const pokedex = await getPokedex();
      setPokedex(pokedex);
    };
    loadPokedex();
    setIsLoading(false);
  }, []);

  const handleMoreButton = () => {
    setNext(next + eachFetch);
  };

  return (
    <div className='pokedex'>
      {isLoading ? (
        <div role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </div>
      ) : (
        <>
          <div className="pokedex__col" >
            {
              pokedex.slice(0, next).map((pokemon: IPokedex, index: number) => (
                <div key={index} className='pokedex__card'>
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
              ))
            }
          </div>
          {next < pokedex.length && (
            <LoadButton onClick={handleMoreButton} />
          )}
        </>
      )}
      <ScrollArrow />
    </div>
  );
};

export default Pokedex;
