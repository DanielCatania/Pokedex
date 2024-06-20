import React from "react";
import { pokemonCard } from "@/types/pokemon";
import Text from "@/components/Text";
import { Box } from "./style";
import Link from "next/link";

interface IPokemonCard {
  pokemonData: pokemonCard;
}

export default function PokemonCard({ pokemonData }: IPokemonCard) {
  return (
    <Box>
      <Link href={`/pokemon/${pokemonData.id}`}>
        <img src={pokemonData.imgUrl} alt={pokemonData.name} />
        <Text>{pokemonData.name}</Text>
        <Text>{pokemonData.id}</Text>
        <ul>
          {pokemonData.types.map((type) => (
            <li key={pokemonData.name + type}>{type}</li>
          ))}
        </ul>
      </Link>
    </Box>
  );
}
