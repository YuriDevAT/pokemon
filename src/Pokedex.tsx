import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokedex();
  }, []);

  const getPokedex = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const { results } = await res.json();
      const pokedex = results.map((pokemon: any, index: number) => {
        const paddedId = ('00' + (index + 1)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return { ...pokemon, image };
      });
      setPokemon(pokedex);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      {loading ? (
        'Fetching Pokemon...'
      ) : (
        <Row>
          {pokemon.map((pokemon: any, index: number) => (
            <Col key={index} xs={1} sm={1} md={1} lg={1} xl={1}>
              <a href={`/pokemon/${index + 1}`}>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>
                  {index + 1}.<span>{pokemon.name}</span>
                </p>
              </a>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Pokedex;
