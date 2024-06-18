import React, { useState, useEffect, useRef } from "react";
import { InferGetStaticPropsType } from "next";

import Text from "@/components/Text";

import Lottie from "react-lottie";
import loadAnimationData from "@/lottie/animation-load.json";

import { getStaticProps } from "@/pages/index";

import { pokemonCard } from "@/types/pokemon";
import getPokemonsList from "@/service/getPokemonsList";
import PokemonCard from "./components/PokemonCard";
import { PokemonsGrid } from "./style";

export default function HomeScreen({
  initialPokemonsList,
  initialUrlPokemonsList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [urlPokemonsList, setUrlPokemonsList] = useState(
    initialUrlPokemonsList
  );
  const [pokemonsList, setPokemonsList] =
    useState<pokemonCard[]>(initialPokemonsList);

  const sentryRef = useRef(null);
  const [sentryIsVisble, setSentryIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setSentryIsVisible(entries[0].isIntersecting);
    });

    observer.observe(sentryRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sentryIsVisble) {
      getPokemonsList(urlPokemonsList, {
        local: "client",
        clientNotifiers: {
          url: setUrlPokemonsList,
          pokemonsList: setPokemonsList,
        },
      });
    }
  }, [sentryIsVisble, urlPokemonsList]);

  return (
    <>
      <Text>Pokédex</Text>
      <PokemonsGrid>
        {pokemonsList.map((pokemonCard) => (
          <PokemonCard pokemonData={pokemonCard} key={pokemonCard.id} />
        ))}
        <span ref={sentryRef}>
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
    </>
  );
}
