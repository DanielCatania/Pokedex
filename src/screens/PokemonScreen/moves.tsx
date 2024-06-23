import React from "react";
import Text from "@/components/Text";
import Link from "next/link";

export default function MovesScreen({ movesData }) {
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
