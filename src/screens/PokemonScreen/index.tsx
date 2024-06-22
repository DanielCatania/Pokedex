import React from "react";
import { InferGetServerSidePropsType } from "next";
import Text from "@/components/Text";
import Link from "next/link";
import { getServerSideProps } from "@/pages/pokemon/[id]";

export default function PokemonScreen({
  pokemonData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Link href="/">Home</Link>
      <main>
        <img src={pokemonData.imgUrl} alt={pokemonData.name} />
        <Text>{pokemonData.name}</Text>
        <Text>{pokemonData.id}</Text>
        <Text>Weight: {pokemonData.weight}</Text>
        <Text>Height: {pokemonData.height}</Text>
        <ul>
          {pokemonData.types.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <ul>
          {pokemonData.abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
        <Link href={`/pokemon/${pokemonData.id}/moves`}>Moves</Link>
      </main>
    </>
  );
}
