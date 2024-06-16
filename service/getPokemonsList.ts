import { pokemonCard } from "@/types/pokemon";
import setState from "@/types/setState";

async function getPokemonsList(
  url: string,
  setUrl: setState<string>,
  setPokemonsList: setState<pokemonCard[]>
) {
  const response = await fetch(url);
  const data = await response.json();

  setUrl(data.next);
  const pokemonsCallingCard = data.results;

  pokemonsCallingCard.forEach(async (callingCard) => {
    const response = await fetch(callingCard.url);
    const pokemonDescription = await response.json();
    const id = pokemonDescription.id;

    const types: string[] = [];

    pokemonDescription.types.forEach(({ type }) => types.push(type.name));

    const pokemon: pokemonCard = {
      id,
      name: pokemonDescription.name,
      types,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };

    setPokemonsList((current) => [...current, pokemon]);
  });
}

export default getPokemonsList;
