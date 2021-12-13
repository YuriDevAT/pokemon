import { useEffect, useState } from 'react';
import { colors } from '../utils/bgColor';
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
import { Link, useNavigate, useParams } from 'react-router-dom';

const Pokemon = () => {
  const [pokemonDetails, setPokemonDetails] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState<any>([]);
  const [evolution, setEvolution] = useState<any>([]);

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

  const getSpecies = async (id: string | undefined) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const result = await res.json();
      setSpecies(result);
    } catch (err) {
      console.error(err);
    }
  };

  const chainUrl = species.evolution_chain && species.evolution_chain.url;

  useEffect(() => {
    const getEvolution = async () => {
      try {
        const res = await fetch(chainUrl);
        const pokemon = await res.json();
        setEvolution(pokemon);
      } catch (err) {
        console.error(err);
      }
    };
    getEvolution();
  }, [chainUrl]);

  useEffect(() => {
    getPokemon(id);
    getSpecies(id);
  }, [id]);

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  let typeName = pokemonDetails.types && pokemonDetails.types[0].type.name;
  const bgColor: string = colors[typeName];

  const evolutionExist = evolution.chain && evolution.chain.evolves_to[0];
  const evolutionTwoExist =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0];
  const noEvolution = evolution.chain && !evolution.chain.evolves_to.length;

  let evolutionOne = evolution.chain && evolution.chain.species.name;
  let urlOne =
    evolution.chain && evolution.chain.species.url.substr(42).replace('/', '');
  let imgUrlOne = evolution.chain && urlOne.padStart(3, '0');
  let imgOne = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlOne}.png`;

  let evolutionTwo =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].species.name;
  let urlTwo =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].species.url.substr(42).replace('/', '');
  let imgUrlTwo = evolution.chain && urlTwo.padStart(3, '0');
  let imgTwo = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlTwo}.png`;

  let evolutionThree =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0].species.name;
  let urlThree =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0].species.url
      .substr(42)
      .replace('/', '');
  let imgUrlThree =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0] &&
    urlThree.padStart(3, '0');
  let imgThree = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlThree}.png`;

  return (
    <Container fluid className='pokemon' style={{ backgroundColor: bgColor }}>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </Spinner>
      ) : (
        <div className='details' style={{ position: 'relative' }}>
          <Row>
            <Col className='details--header'>
              <h1>{pokemonDetails.name}</h1>
              <h3>#{pokemonDetails.id.toString().padStart(3, '0')}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup className='details--type'>
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
              width='350px'
              className='details--img'
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
                    <ListGroup className='box--moves'>
                      {pokemonDetails.moves
                        .slice(0, 62)
                        .map((move: any, index: number) => (
                          <ListGroup.Item key={index}>
                            {move.move.name}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Tab>
                  {noEvolution && (
                    <Tab
                      eventKey='evolutions'
                      title='Evolutions'
                      disabled
                    ></Tab>
                  )}
                  {evolutionExist && (
                    <Tab eventKey='evolutions' title='Evolutions'>
                      <ListGroup className='box--evolutions'>
                        <ListGroup.Item>
                          <Link to={`/pokemon/${urlOne}`}>
                            <Image
                              src={imgOne}
                              alt={evolutionOne}
                              width='200px'
                            />
                            {evolutionOne}
                          </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link to={`/pokemon/${urlTwo}`}>
                            <Image
                              src={imgTwo}
                              alt={evolutionTwo}
                              width='200px'
                            />
                            {evolutionTwo}
                          </Link>
                        </ListGroup.Item>
                        {evolutionTwoExist && (
                          <ListGroup.Item>
                            <Link to={`/pokemon/${urlThree}`}>
                              <Image
                                src={imgThree}
                                alt={evolutionThree}
                                width='200px'
                              />
                              {evolutionThree}
                            </Link>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </Tab>
                  )}
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
