import { useEffect, useState } from 'react';
import { colors } from './utils/bgColor';
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  ListGroup,
  ProgressBar,
  Tab,
  Tabs,
  TabContainer,
} from 'react-bootstrap';
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

  let typeName = pokemonDetails.types && pokemonDetails.types[0].type.name;
  const bgColor: string = colors[typeName];

  return (
    <Container fluid className='pokemon' style={{ backgroundColor: bgColor }}>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </Spinner>
      ) : (
        <div className='details' style={{ position: 'relative' }}>
          <Row>
            <Col className='header'>
              <h1>{pokemonDetails.name}</h1>
              <h3>#{pokemonDetails.id.toString().padStart(3, '0')}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup className='type'>
                {pokemonDetails.types.map((type: any, index: number) => (
                  <ListGroup.Item key={index}>{type.type.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Image
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
              className='pokemon-img'
            />
          </Row>
          <TabContainer>
            <Row className='clearfix'>
              <Col sm={12} className='box'>
                <Tabs defaultActiveKey='stats'>
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
                        .slice(0, 62)
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
          </TabContainer>
          <Button variant='dark' onClick={handleClick}>
            <span>Catch another Pokémon</span>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Pokemon;
