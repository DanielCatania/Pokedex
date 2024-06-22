import React, { useState, useEffect, useRef } from "react";
import { InferGetStaticPropsType } from "next";

import Text from "@/components/Text";

import Lottie from "react-lottie";
import loadAnimationData from "@/lottie/animation-load.json";

import { getStaticProps } from "@/pages/index";

import { pokemonCard } from "@/types/pokemon";
import getPokemonsList from "@/service/getPokemonsList";
import PokemonCard from "./components/PokemonCard";
import { Main, PokemonsGrid } from "./style";

export default function HomeScreen({
  initialPokemonsList,
  initialUrlPokemonsList,
  baseUrlPokemonsList,
  types,
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
    if (urlPokemonsList === null) {
      sentryRef.current.classList = "invisible";
      return;
    }

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
      <Main>
        <select
          name="type"
          id="type"
          onChange={(e) => {
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
          }}
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
