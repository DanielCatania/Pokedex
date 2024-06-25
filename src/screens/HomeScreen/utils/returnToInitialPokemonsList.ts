import { pokemonCard } from "@/types/pokemon";
import handleSentry from "./handleSentry";
import setState from "@/types/setState";
import getPokemonsList from "@/service/getPokemonsList";

async function returnToInitialPokemonsList(
  baseUrlPokemonsList: string,
  setUrlPokemonsList: setState<string>,
  setPokemonsList: setState<pokemonCard[]>,
  sentry: handleSentry,
  setTypeFilter: setState<string>
) {
  setTypeFilter("base");
  setPokemonsList([]);
  await getPokemonsList(baseUrlPokemonsList, {
    local: "client",
    urlType: "pokemon",
    clientNotifiers: {
      url: setUrlPokemonsList,
      pokemonsList: setPokemonsList,
    },
  });
  sentry.enable();
}

export default returnToInitialPokemonsList;
