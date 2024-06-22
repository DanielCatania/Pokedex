import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import pokemonData from "@/types/pokemon";
import Text from "@/components/Text";
import Link from "next/link";

interface IgetServerSideProps {
  props: {
    status: "200" | "404";
    pokemonData?: pokemonData;
  };
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${ctx.params.id}/`;
    const response = await fetch(url);
    const data = await response.json();

    const types: string[] = [];
    data.types.forEach(({ type }) => types.push(type.name));

    const abilities: string[] = [];
    data.abilities.forEach(({ ability }) => abilities.push(ability.name));

    const pokemonData = {
      id: data.id,
      name: data.name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      types,
      abilities,
      weight: data.weight,
      height: data.height,
    };
    return {
      props: {
        status: "200",
        pokemonData,
      },
    } satisfies IgetServerSideProps;
  } catch (error) {
    console.log(error);
    return { props: { status: "404" } } satisfies IgetServerSideProps;
  }
}

export default function PokemonScreen({
  status,
  pokemonData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (status === "404") {
    return <>404</>;
  }

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
