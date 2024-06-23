import React from "react";

import Lottie from "react-lottie";
import loadAnimationData from "@/lottie/animation-load.json";

import Text from "@/components/Text";
import PokemonCard from "./components/PokemonCard";

import { Main, PokemonsGrid } from "./style";

import handleChangePokemonFilterType from "./handles/handleChangePokemonFilterType";
import setState from "@/types/setState";
import { pokemonCard } from "@/types/pokemon";

interface HomeScreenProps {
  setPokemonsList: setState<pokemonCard[]>;
  setUrlPokemonsList: setState<string>;
  baseUrlPokemonsList: string;
  sentryRef: React.MutableRefObject<any>;
  pokemonsList: pokemonCard[];
  types: any[];
}

export default function HomeScreen({
  setPokemonsList,
  setUrlPokemonsList,
  sentryRef,
  baseUrlPokemonsList,
  pokemonsList,
  types,
}: HomeScreenProps) {
  return (
    <>
      <Text>Pokédex</Text>
      <Main>
        <select
          name="type"
          id="type"
          onChange={(e) =>
            handleChangePokemonFilterType(
              e,
              setPokemonsList,
              setUrlPokemonsList,
              baseUrlPokemonsList,
              sentryRef
            )
          }
        >
          <option value="base">Find Pokemon By Type</option>
          {types.map((type, i) => (
            <option key={type.name + i} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
        <PokemonsGrid>
          {pokemonsList.length === 0 ? (
            <Text>No Pokémon found</Text>
          ) : (
            <>
              {pokemonsList.map((pokemonCard, i) => (
                <PokemonCard
                  pokemonData={pokemonCard}
                  key={pokemonCard.id + i}
                />
              ))}
            </>
          )}
          <span id="sentry" ref={sentryRef}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loadAnimationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={128}
              width={128}
            />
          </span>
        </PokemonsGrid>
      </Main>
    </>
  );
}
