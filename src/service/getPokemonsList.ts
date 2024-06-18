import { pokemonCard } from "@/types/pokemon";
import setState from "@/types/setState";

async function getPokemonsList(
  url: string,
  options?: {
    local?: "client" | "server";
    clientNotifiers?: {
      url: setState<string>;
      pokemonsList: setState<pokemonCard[]>;
    };
  }
) {
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

  if (options?.local === "client") {
    options.clientNotifiers?.pokemonsList((current) => [
      ...current,
      ...pokemonsList,
    ]);
    options.clientNotifiers?.url(newUrl);
  }

  return [newUrl, pokemonsList];
}

export default getPokemonsList;
