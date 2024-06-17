import React, { useState } from "react";
import Text from "@/components/Text";
import getPokemonsList from "@/service/getPokemonsList";
import { pokemonCard } from "@/types/pokemon";
import { InferGetStaticPropsType } from "next";

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
      </ul>
      <button
        onClick={async () => {
          const [newUrl, pokemonsList] = await getPokemonsList(urlPokemonsList);
          setUrlPokemonsList(newUrl);
          setPokemonsList((current) => [...current, ...pokemonsList]);
        }}
      >
        Load more pokémons
      </button>
    </>
  );
}
