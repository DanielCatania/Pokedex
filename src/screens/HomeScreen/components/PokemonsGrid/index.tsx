import React, { useContext } from "react";

import Lottie from "react-lottie";
import loadAnimationData from "@/lottie/animation-load.json";

import PokemonCard from "../PokemonCard";
import { Box } from "./style";
import { HomePageContext } from "@/pages";
import Text from "@/components/Text";

export default function PokemonsGrid() {
  const { pokemonsList, sentryRef } = useContext(HomePageContext);

  return (
    <Box>
      {pokemonsList.length === 0 ? (
        <Text>No Pokémon found</Text>
      ) : (
        <>
          {pokemonsList.map((pokemonCard, i) => (
            <PokemonCard pokemonData={pokemonCard} key={pokemonCard.id + i} />
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
    </Box>
  );
}
