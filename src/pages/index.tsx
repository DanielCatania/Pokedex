import React, { useState, useEffect, useRef } from "react";
import HomeScreen from "@/screens/HomeScreen";
import getPokemonsList from "@/service/getPokemonsList";
import { InferGetStaticPropsType } from "next";
import { pokemonCard } from "@/types/pokemon";

export const getStaticProps = async () => {
  try {
    const baseUrlPokemonsList =
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

    const [initialUrlPokemonsList, initialPokemonsList] = await getPokemonsList(
      baseUrlPokemonsList
    );

    const responseTypes = await fetch(
      "https://pokeapi.co/api/v2/type/?offset=0&limit=21"
    );
    const dataTypes = await responseTypes.json();

    return {
      props: {
        baseUrlPokemonsList,
        initialUrlPokemonsList,
        initialPokemonsList,
        types: dataTypes.results,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
      props: { error },
    };
  }
};

export default function HomePage({
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

  const HomeScreenProps = {
    setPokemonsList,
    setUrlPokemonsList,
    sentryRef,
    baseUrlPokemonsList,
    pokemonsList,
    types,
  };

  return <HomeScreen {...HomeScreenProps} />;
}
