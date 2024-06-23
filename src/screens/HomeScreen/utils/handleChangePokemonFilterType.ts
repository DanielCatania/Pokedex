import { pokemonCard } from "@/types/pokemon";
import getPokemonsList from "@/service/getPokemonsList";
import setState from "@/types/setState";
import handleSentry from "./handleSentry";

function handleChangePokemonFilterType(
  e: React.ChangeEvent<HTMLSelectElement>,
  setPokemonsList: setState<pokemonCard[]>,
  setUrlPokemonsList: setState<string>,
  baseUrlPokemonsList: string,
  sentry: handleSentry
) {
  if (e.target.value === "base") {
    setPokemonsList([]);
    getPokemonsList(baseUrlPokemonsList, {
      local: "client",
      urlType: "pokemon",
      clientNotifiers: {
        url: setUrlPokemonsList,
        pokemonsList: setPokemonsList,
      },
    });
    sentry.enable();

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
