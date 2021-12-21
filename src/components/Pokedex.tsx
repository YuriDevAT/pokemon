import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollArrow } from '../utils/scrollArrow';
import { Container, Card, Col, Row, Spinner } from 'react-bootstrap';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokedex();
  }, []);

  const getPokedex = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
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
            <Col
              key={index}
              xs={12}
              sm={6}
              lg={3}
              xl={2}
              className='pokedex__col'
            >
              <Card className='pokedex__card'>
                <Link to={`/pokemon/${index + 1}`} className='pokedex__link'>
                  <Card.Img
                    src={pokemon.image}
                    alt={pokemon.name}
                    width='180'
                    height='180'
                  />
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
      <ScrollArrow />
    </Container>
  );
};

export default memo(Pokedex);
