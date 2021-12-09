import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

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

  return (
    <Container>
      <h1>Pokemon</h1>
      {loading ? (
        'Fetching Pokemon...'
      ) : (
        <div>
          <h2>{pokemonDetails.name}</h2>
          <h2>{pokemonDetails.id}</h2>
          <img src={pokemonDetails.image} alt={pokemonDetails.name} />
          <p>
            {pokemonDetails.types.map((type: any, index: number) => (
              <p key={index}>{type.type.name}</p>
            ))}
          </p>
        </div>
      )}
    </Container>
  );
};

export default Pokemon;
