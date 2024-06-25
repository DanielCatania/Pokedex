import React from "react";

import { Main } from "./style";

import PokemonsGrid from "./components/PokemonsGrid";
import Filters from "./components/Filters";

export default function HomeScreen() {
  return (
    <>
      <Main>
        <Filters />
        <PokemonsGrid />
      </Main>
    </>
  );
}
