import getPokemonsList from "@/service/getPokemonsList";

export const getStaticProps = async () => {
  const urlPokemonsList: string =
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

  const [initialUrlPokemonsList, initialPokemonsList] = await getPokemonsList(
    urlPokemonsList
  );

  return {
    props: { initialUrlPokemonsList, initialPokemonsList },
  };
};

export { default } from "@/screens/HomeScreen";
