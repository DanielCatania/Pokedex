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
  moves: pokemonMove[];
  weight: string;
  height: string;
};

export default pokemonData;
