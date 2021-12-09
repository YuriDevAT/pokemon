import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const Pokemon = () => {
  const [pokemonDetails, setPokemonDetails] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getPokemon = async (id: string | undefined) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await res.json();
      const paddedId = ('00' + id).slice(-3);
      pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      setPokemonDetails(pokemon);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPokemon(id);
  }, [id]);

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Container fluid>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </Spinner>
      ) : (
        <div>
          <h2>{pokemonDetails.name}</h2>
          <h2>{pokemonDetails.id}</h2>
          <img src={pokemonDetails.image} alt={pokemonDetails.name} />
          <h3>Types</h3>
          <p>
            {pokemonDetails.types.map((type: any, index: number) => (
              <p key={index}>{type.type.name}</p>
            ))}
          </p>
          <h3>Abilities</h3>
          <p>
            {pokemonDetails.abilities.map((ability: any, index: number) => (
              <p key={index}>{ability.ability.name}</p>
            ))}
          </p>
          <h3>Stats</h3>
          <p>
            {pokemonDetails.stats.map((stat: any, index: number) => (
              <p key={index}>
                {stat.stat.name} {stat.base_stat}
              </p>
            ))}
          </p>
          <h3>Moves</h3>
          <p className='moves'>
            {pokemonDetails.moves
              .slice(0, 3)
              .map((move: any, index: number) => (
                <p key={index}>{move.move.name}</p>
              ))}
          </p>
          {/* <p className='possible evolution'>
      {pokemonDetails.stats.map((type: any, index: number) => (
        <p key={index}>{type.type.name}</p>
      ))}
    </p> */}
          <button onClick={handleClick}>Catch another Pokémon</button>
        </div>
      )}
    </Container>
  );
};

export default Pokemon;
