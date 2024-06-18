import React, { useState, useEffect, useRef } from "react";
import { InferGetStaticPropsType } from "next";
import Text from "@/components/Text";
import getPokemonsList from "@/service/getPokemonsList";
import { pokemonCard } from "@/types/pokemon";
import Lottie from "react-lottie";
import loadAnimationData from "@/lottie/animation-load.json";

export const getStaticProps = async () => {
  const urlPokemonsList: string =
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

  const [initialUrlPokemonsList, initialPokemonsList] = await getPokemonsList(
    urlPokemonsList
  );

  return {
    props: { initialUrlPokemonsList, initialPokemonsList },
  };
};

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
      <ul>
        {pokemonsList.map((pokemonCard) => (
          <li key={pokemonCard.id}>
            <img src={pokemonCard.imgUrl} alt={pokemonCard.name} />
            <Text>{pokemonCard.name}</Text>
            <Text>{pokemonCard.id}</Text>
            <ul>
              {pokemonCard.types.map((type) => (
                <li key={pokemonCard.name + type}>{type}</li>
              ))}
            </ul>
          </li>
        ))}
        <li ref={sentryRef}>
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
        </li>
      </ul>
    </>
  );
}
