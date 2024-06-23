import { pokemonCard } from "@/types/pokemon";
import getPokemonsList from "@/service/getPokemonsList";
import setState from "@/types/setState";

function handleChangePokemonFilterType(
  e: React.ChangeEvent<HTMLSelectElement>,
  setPokemonsList: setState<pokemonCard[]>,
  setUrlPokemonsList: setState<string>,
  baseUrlPokemonsList: string,
  sentryRef: React.MutableRefObject<any>
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
    sentryRef.current.classList = "";

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
  sentryRef.current.classList = "invisible";
}

export default handleChangePokemonFilterType;
