import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import pokemonData, { pokemonMove } from "@/types/pokemon";
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

    const movesPromises = data.moves.map(async (callingCard) => {
      try {
        const { name } = callingCard.move;

        const response = await fetch(callingCard.move.url);
        console.log(response);
        const moveDescription = await response.json();

        const move: pokemonMove = {
          id: moveDescription.id,
          name,
          effect: moveDescription.effect_entries[0].short_effect,
        };

        return move;
      } catch (error) {
        return {
          id: "error",
          name: "error",
          effect: "error",
        };
      }
    });

    const moves = await Promise.all(movesPromises);

    const pokemonData = {
      id: data.id,
      name: data.name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      types,
      abilities,
      weight: data.weight,
      height: data.height,
      moves,
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
        <ul>
          {pokemonData.moves.map((move) => {
            if (move.id === "error") {
              return <></>;
            }
            return (
              <li key={move.id}>
                <Text>{move.name}</Text>
                <Text>{move.effect}</Text>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
