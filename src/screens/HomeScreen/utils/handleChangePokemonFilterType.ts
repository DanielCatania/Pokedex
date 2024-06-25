import { pokemonCard } from "@/types/pokemon";
import getPokemonsList from "@/service/getPokemonsList";
import setState from "@/types/setState";
import handleSentry from "./handleSentry";
import returnToInitialPokemonsList from "./returnToInitialPokemonsList";

function handleChangePokemonFilterType(
  e: React.ChangeEvent<HTMLSelectElement>,
  setPokemonsList: setState<pokemonCard[]>,
  setUrlPokemonsList: setState<string>,
  baseUrlPokemonsList: string,
  sentry: handleSentry,
  setTypeFilter: setState<string>
) {
  if (e.target.value === "base") {
    returnToInitialPokemonsList(
      baseUrlPokemonsList,
      setUrlPokemonsList,
      setPokemonsList,
      sentry,
      setTypeFilter
    );

    return;
  }
  getPokemonsList(e.target.value, {
    local: "client",
    urlType: "type",
    clientNotifiers: {
      url: setUrlPokemonsList,
      pokemonsList: setPokemonsList,
    },
  });
  sentry.disable();
}

export default handleChangePokemonFilterType;
