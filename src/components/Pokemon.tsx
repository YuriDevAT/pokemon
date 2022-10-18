import { useEffect, useState } from 'react';
import { colors } from '../utils/bgColor';
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

  const chainUrl = species.evolution_chain?.url;

  useEffect(() => {
    getPokemon(id);
    getSpecies(id);

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
  }, [chainUrl, id]);

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  let typeName = pokemonDetails.types?.[0].type.name;
  const bgColor: string = colors[typeName];

  const noEvolution = evolution.chain && !evolution.chain.evolves_to.length;
  const hasVariety = evolution.chain?.evolves_to[0]?.evolves_to[1];

  const evolutionExist = evolution.chain?.evolves_to[0];
  const evolutionTwoExist = evolution.chain?.evolves_to[0]?.evolves_to[0];

  const isEevee = evolution.chain?.evolves_to.length > 2;
  const hasTwoVarieties = evolution.chain?.evolves_to.length === 2;

  const eeveeClass = isEevee ? 'box__evolution-isEevee' : '';

  return (
    <div className='pokemon' style={{ backgroundColor: bgColor }}>
      {loading ? (
        <div role='status'>
          <span className='visually-hidden'>Fetching Pokemon...</span>
        </div>
      ) : (
        <div className='pokemon__details' style={{ position: 'relative' }}>
          <div>
            <div className='pokemon__header'>
              <h1>{pokemonDetails.name}</h1>
              <h2>#{pokemonDetails.id.toString().padStart(3, '0')}</h2>
            </div>
          </div>
          <div>
            <div>
              <div className='pokemon__type'>
                {pokemonDetails.types.map((type: any, index: number) => (
                  <div key={index} className='pokemon__type-list'>
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <img
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
              width='200px'
              height='200px'
              className='pokemon__image'
            />
          </div>
          <div>
            <div className='clearfix'>
              <div className='box'>
                <div className='box__navbar'>
                  <div title='Abilities'>
                    <div>
                      {pokemonDetails.abilities.map(
                        (ability: any, index: number) => (
                          <div key={index}>
                            {ability.ability.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div title='Stats'>
                    <div>
                      {pokemonDetails.stats.map((stat: any, index: number) => (
                        <div key={index}>
                          {stat.stat.name}
                          <div
                            role='progressbar'
                            aria-label='stats values'
                            aria-labelledby={stat.stat.name}
                            title='Stats values'
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div title='Moves'>
                    <div className='box__moves'>
                      {pokemonDetails.moves
                        .slice(0, 62)
                        .map((move: any, index: number) => (
                          <div
                            key={index}
                            className='box__moves-list'
                          >
                            {move.move.name}
                          </div>
                        ))}
                    </div>
                  </div>
                  {noEvolution && (
                    <div
                      title='Evolutions'
                    ></div>
                  )}
                  {evolutionExist && (
                    <div title='Evolutions'>
                      <div className='box__evolutions'>
                        <div>
                          <Link
                            to={`/pokemon/${evolution.chain.species.url
                              .substr(42)
                              .replace('/', '')}`}
                            className='box__evolution-link'
                          >
                            <img
                              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${evolution.chain.species.url
                                .substr(42)
                                .replace('/', '')
                                .padStart(3, '0')}.png`}
                              alt={evolution.chain.species.name}
                              width='150px'
                              height='150px'
                            />
                            {evolution.chain.species.name}
                          </Link>
                        </div>
                        <div className={eeveeClass}>
                          {evolution.chain.evolves_to.map(
                            (pokemon: any, index: number) => (
                              <Link
                                key={index}
                                to={`/pokemon/${pokemon.species.url
                                  .substr(42)
                                  .replace('/', '')}`}
                                className='box__evolution-link'
                              >
                                <img
                                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.species.url
                                    .substr(42)
                                    .replace('/', '')
                                    .padStart(3, '0')}.png`}
                                  alt={pokemon.species.name}
                                  width={
                                    isEevee || hasTwoVarieties
                                      ? '100px'
                                      : '150px'
                                  }
                                  height={
                                    isEevee || hasTwoVarieties
                                      ? '100px'
                                      : '150px'
                                  }
                                />
                                {pokemon.species.name}
                              </Link>
                            )
                          )}
                        </div>
                        {evolutionTwoExist && (
                          <div>
                            {evolution.chain.evolves_to[0].evolves_to.map(
                              (pokemon: any, index: number) => (
                                <Link
                                  key={index}
                                  to={`/pokemon/${pokemon.species.url
                                    .substr(42)
                                    .replace('/', '')}`}
                                >
                                  <img
                                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.species.url
                                      .substr(42)
                                      .replace('/', '')
                                      .padStart(3, '0')}.png`}
                                    alt={pokemon.species.name}
                                    width={
                                      hasVariety || hasTwoVarieties
                                        ? '100px'
                                        : '150px'
                                    }
                                    height={
                                      hasVariety || hasTwoVarieties
                                        ? '100px'
                                        : '150px'
                                    }
                                  />
                                  {pokemon.species.name}
                                </Link>
                              )
                            )}
                            {hasTwoVarieties && (
                              <Link
                                to={`/pokemon/${evolution.chain.evolves_to[1].evolves_to[0].species.url
                                  .substr(42)
                                  .replace('/', '')}`}
                              >
                                <img
                                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${evolution.chain.evolves_to[1].evolves_to[0].species.url
                                    .substr(42)
                                    .replace('/', '')
                                    .padStart(3, '0')}.png`}
                                  alt={
                                    evolution.chain.evolves_to[1].evolves_to[0]
                                      .species.name
                                  }
                                  width='100px'
                                  height='100px'
                                />
                                {
                                  evolution.chain.evolves_to[1].evolves_to[0]
                                    .species.name
                                }
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleClick} className='button'>
            <span className='button__span'>Catch another Pokémon</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
