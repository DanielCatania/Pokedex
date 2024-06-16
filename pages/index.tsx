import React, { useState, useEffect } from "react";
import Text from "@/components/Text";
import getPokemonsList from "@/service/getPokemonsList";
import { pokemonCard } from "@/types/pokemon";

export default function HomeScreen() {
  const [urlPokemonsList, setUrlPokemonsList] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6"
  );
  const [pokemonList, setPokemonList] = useState<pokemonCard[]>([]);

  useEffect(() => {
    getPokemonsList(urlPokemonsList, setUrlPokemonsList, setPokemonList);
  }, []);
  return (
    <>
      <Text>Pokédex</Text>
      <ul>
        {pokemonList.map((pokemonCard) => (
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
        onClick={() =>
          getPokemonsList(urlPokemonsList, setUrlPokemonsList, setPokemonList)
        }
      >
        Load more pokémons
      </button>
    </>
  );
}
