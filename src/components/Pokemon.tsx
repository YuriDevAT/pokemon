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
  const hasVariety =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[1];
  const noEvolution = evolution.chain && !evolution.chain.evolves_to.length;

  const imgUrlOne =
    evolution.chain &&
    evolution.chain.species.url.substr(42).replace('/', '').padStart(3, '0');
  const imgOne = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlOne}.png`;

  const imgUrlTwo =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].species.url
      .substr(42)
      .replace('/', '')
      .padStart(3, '0');
  const imgTwo = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlTwo}.png`;

  const imgUrlThree =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[0].species.url
      .substr(42)
      .replace('/', '')
      .padStart(3, '0');
  const imgThree = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlThree}.png`;

  const imgUrlVariety =
    evolution.chain &&
    evolution.chain.evolves_to[0] &&
    evolution.chain.evolves_to[0].evolves_to[1] &&
    evolution.chain.evolves_to[0].evolves_to[1].species.url
      .substr(42)
      .replace('/', '')
      .padStart(3, '0');
  const imgVariety = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgUrlVariety}.png`;

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
                          <Link
                            to={`/pokemon/${evolution.chain.species.url
                              .substr(42)
                              .replace('/', '')}`}
                          >
                            <Image
                              src={imgOne}
                              alt={evolution.chain.species.name}
                              width='200px'
                            />
                            {evolution.chain.species.name}
                          </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link
                            to={`/pokemon/${evolution.chain.evolves_to[0].species.url
                              .substr(42)
                              .replace('/', '')}`}
                          >
                            <Image
                              src={imgTwo}
                              alt={evolution.chain.evolves_to[0].species.name}
                              width='200px'
                            />
                            {evolution.chain.evolves_to[0].species.name}
                          </Link>
                        </ListGroup.Item>
                        {evolutionTwoExist && !hasVariety && (
                          <ListGroup.Item>
                            <Link
                              to={`/pokemon/${evolution.chain.evolves_to[0].evolves_to[0].species.url
                                .substr(42)
                                .replace('/', '')}`}
                            >
                              <Image
                                src={imgThree}
                                alt={
                                  evolution.chain.evolves_to[0].evolves_to[0]
                                    .species.name
                                }
                                width='200px'
                              />
                              {
                                evolution.chain.evolves_to[0].evolves_to[0]
                                  .species.name
                              }
                            </Link>
                          </ListGroup.Item>
                        )}
                        {hasVariety && (
                          <ListGroup.Item>
                            {evolution.chain.evolves_to[0].evolves_to.map(
                              (pokemon: any, index: number) => (
                                <Link
                                  key={index}
                                  to={`/pokemon/${pokemon.species.url
                                    .substr(42)
                                    .replace('/', '')}`}
                                >
                                  <Image
                                    src={imgThree}
                                    alt={pokemon.species.name}
                                    width='100px'
                                  />
                                  {pokemon.species.name}
                                </Link>
                              )
                            )}
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
