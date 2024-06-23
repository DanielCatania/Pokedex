import React from "react";

import Text from "@/components/Text";

import { Main } from "./style";

import PokemonsGrid from "./components/PokemonsGrid";
import Filters from "./components/Filters";

export default function HomeScreen() {
  return (
    <>
      <Text>Pokédex</Text>
      <Main>
        <Filters />
        <PokemonsGrid />
      </Main>
    </>
  );
}
