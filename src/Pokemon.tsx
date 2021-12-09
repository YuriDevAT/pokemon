import { useEffect, useState } from 'react';
import { ListGroup, ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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

  let bgColor = pokemonDetails.types && pokemonDetails.types[0].type.name;

  return (
    <Container fluid className={bgColor}>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </Spinner>
      ) : (
        <>
          <Row>
            <Col>
              <Card>
                <Card.Title>{pokemonDetails.name}</Card.Title>
                <Card.Text>
                  #{pokemonDetails.id.toString().padStart(3, '0')}
                </Card.Text>
              </Card>
            </Col>
          </Row>
          <Row xs={1} md={2}>
            <Col>
              <Card>
                <Card.Img
                  src={pokemonDetails.image}
                  alt={pokemonDetails.name}
                />
                <Card.Body>
                  <Card.Title>Types</Card.Title>
                  <ListGroup>
                    {pokemonDetails.types.map((type: any, index: number) => (
                      <ListGroup.Item key={index}>
                        {type.type.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Title>Abilities</Card.Title>
                  <ListGroup>
                    {pokemonDetails.abilities.map(
                      (ability: any, index: number) => (
                        <ListGroup.Item key={index}>
                          {ability.ability.name}
                        </ListGroup.Item>
                      )
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Title>Stats</Card.Title>
                <ListGroup>
                  {pokemonDetails.stats.map((stat: any, index: number) => (
                    <ListGroup.Item>
                      {stat.stat.name}
                      <ProgressBar
                        key={index}
                        now={stat.base_stat}
                        label={stat.base_stat}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Title>Moves</Card.Title>
                <ListGroup className='moves'>
                  {pokemonDetails.moves
                    .slice(0, 3)
                    .map((move: any, index: number) => (
                      <ListGroup.Item key={index}>
                        {move.move.name}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card>
            </Col>
            <Col>
              {/* <p className='possible evolution'>
      {pokemonDetails.stats.map((type: any, index: number) => (
        <p key={index}>{type.type.name}</p>
      ))}
    </p> */}
            </Col>
          </Row>
          <Row>
            <Button variant='dark' onClick={handleClick}>
              Catch another Pokémon
            </Button>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Pokemon;
