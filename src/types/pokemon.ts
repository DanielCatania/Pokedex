export type pokemonCard = {
  id: string;
  name: string;
  types: string[];
  imgUrl: string;
};

export type pokemonMove = {
  name: string;
  effect: string;
  id: string;
};

type pokemonData = {
  id: string;
  name: string;
  types: string[];
  imgUrl: string;

  abilities: string[];
  weight: string;
  height: string;
};

export default pokemonData;
