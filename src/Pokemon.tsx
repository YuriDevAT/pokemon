import { useEffect, useState } from 'react';
import { ListGroup, Nav, ProgressBar, Tab, Tabs } from 'react-bootstrap';
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
    <Container fluid className={`pokemon ${bgColor}`}>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </Spinner>
      ) : (
        <>
          <Row xs={1}>
            <Col className='header'>
              <Card className='details-name'>
                <Card.Title>{pokemonDetails.name}</Card.Title>
                <Card.Text>
                  #{pokemonDetails.id.toString().padStart(3, '0')}
                </Card.Text>
                <ListGroup>
                  {pokemonDetails.types.map((type: any, index: number) => (
                    <ListGroup.Item key={index}>
                      {type.type.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Img
                  src={pokemonDetails.image}
                  alt={pokemonDetails.name}
                />
              </Card>
            </Col>
          </Row>
          <Tab.Container defaultActiveKey='abilities'>
            <Row className='clearfix'>
              <Col sm={12}>
                <Tabs>
                  <Tab eventKey='abilities' title='Abilities'>
                    <ListGroup>
                      {pokemonDetails.abilities.map(
                        (ability: any, index: number) => (
                          <ListGroup.Item key={index}>
                            {ability.ability.name}
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey='stats' title='Stats'>
                    <ListGroup>
                      {pokemonDetails.stats.map((stat: any, index: number) => (
                        <ListGroup.Item key={index}>
                          {stat.stat.name}
                          <ProgressBar
                            now={stat.base_stat}
                            label={stat.base_stat}
                          />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey='moves' title='Moves'>
                    <ListGroup className='moves'>
                      {pokemonDetails.moves
                        .slice(0, 3)
                        .map((move: any, index: number) => (
                          <ListGroup.Item key={index}>
                            {move.move.name}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Tab>
                  <Tab eventKey='evolutions' title='Evolutions' disabled>
                    {/* <p className='possible evolution'>
      {pokemonDetails.stats.map((type: any, index: number) => (
        <p key={index}>{type.type.name}</p>
      ))}
    </p> */}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Tab.Container>
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
