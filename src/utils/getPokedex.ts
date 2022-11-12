export const getPokedex = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=905');
  const { results } = await res.json();

  const pokedex = results.map((pokemon: any, index: number) => {
    const paddedId = ('00' + (index + 1)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return { ...pokemon, image };
  });
  return pokedex;
};
