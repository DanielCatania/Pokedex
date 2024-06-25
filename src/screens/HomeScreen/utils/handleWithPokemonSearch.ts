import { pokemonCard } from "@/types/pokemon";
import setState from "@/types/setState";
import handleSentry from "./handleSentry";

async function handleWithPokemonSearch(
  e: React.FormEvent<HTMLFormElement>,
  searchInput: string,
  setPokemonsList: setState<pokemonCard[]>,
  sentry: handleSentry,
  cleanFiltersInput: () => void
) {
  e.preventDefault();

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase().trim()}`
    );
    const data = await response.json();

    const types: string[] = [];
    data.types.forEach(({ type }) => types.push(type.name));

    const pokemonCard: pokemonCard = {
      id: data.id,
      types,
      name: data.forms[0].name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
    };
    setPokemonsList([pokemonCard]);
  } catch (error) {
    setPokemonsList([]);
  }

  sentry.disable();
  cleanFiltersInput();
}

export default handleWithPokemonSearch;
