import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Col, Row, Spinner } from 'react-bootstrap';

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
    <Container fluid className='pokedex'>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </Spinner>
      ) : (
        <Row>
          {pokemon.map((pokemon: any, index: number) => (
            <Col key={index} xs={12} sm={6} lg={4} xl={2} className='col'>
              <Card>
                <Link to={`/pokemon/${index + 1}`}>
                  <Card.Img src={pokemon.image} alt={pokemon.name} />
                  <Card.Body>
                    <Card.Text>
                      #{(index + 1).toString().padStart(3, '0')}
                    </Card.Text>
                    <Card.Title>{pokemon.name}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Pokedex;
