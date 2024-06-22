import React from "react";
import { InferGetServerSidePropsType } from "next";
import Text from "@/components/Text";
import Link from "next/link";
import { getServerSideProps } from "@/pages/pokemon/[id]/moves";

export default function MovesScreen({
  movesData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Link href={`/pokemon/${movesData.id}`}>Back</Link>
      <main>
        <Text>{movesData.pokemonName} Moves</Text>
        <ul>
          {movesData.moves.map((move, i) => {
            if (move.id === "error") {
              return <></>;
            }
            return (
              <li key={move.name}>
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
