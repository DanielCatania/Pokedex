import { pokemonCard } from "@/types/pokemon";

async function getPokemonsList(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  const newUrl = data.next;

  const pokemonsCallingCard = data.results;

  const pokemonsPromises = pokemonsCallingCard.map(async (callingCard) => {
    const response = await fetch(callingCard.url);
    const pokemonDescription = await response.json();
    const id = pokemonDescription.id;

    const types: string[] = [];

    pokemonDescription.types.forEach(({ type }) => types.push(type.name));

    const pokemonCard: pokemonCard = {
      id,
      name: pokemonDescription.name,
      types,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };

    return pokemonCard;
  });

  const pokemonsList = await Promise.all(pokemonsPromises);

  return [newUrl, pokemonsList];
}

export default getPokemonsList;
