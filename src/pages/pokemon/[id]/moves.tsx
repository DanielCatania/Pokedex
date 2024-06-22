import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { pokemonMove } from "@/types/pokemon";
import Text from "@/components/Text";
import Link from "next/link";

interface IgetServerSideProps {
  props: {
    status: "200" | "404";
    movesData?: {
      id: string;
      pokemonName: string;
      moves: pokemonMove[];
    };
  };
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${ctx.params.id}/`;
    const response = await fetch(url);
    const data = await response.json();

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

    const movesData = {
      id: data.id,
      pokemonName: data.name,
      moves,
    };
    return {
      props: {
        status: "200",
        movesData,
      },
    } satisfies IgetServerSideProps;
  } catch (error) {
    console.log(error);
    return { props: { status: "404" } } satisfies IgetServerSideProps;
  }
}

export default function PokemonScreen({
  status,
  movesData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (status === "404") {
    return <>404</>;
  }

  return (
    <>
      <Link href={`/pokemon/${movesData.id}`}>Back</Link>
      <main>
        <Text>{movesData.pokemonName} Moves</Text>
        <ul>
          {movesData.moves.map((move) => {
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
