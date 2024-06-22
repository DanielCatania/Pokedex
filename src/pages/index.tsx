import getPokemonsList from "@/service/getPokemonsList";

export const getStaticProps = async () => {
  try {
    const baseUrlPokemonsList =
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

    const [initialUrlPokemonsList, initialPokemonsList] = await getPokemonsList(
      baseUrlPokemonsList
    );

    const responseTypes = await fetch(
      "https://pokeapi.co/api/v2/type/?offset=0&limit=21"
    );
    const dataTypes = await responseTypes.json();

    return {
      props: {
        baseUrlPokemonsList,
        initialUrlPokemonsList,
        initialPokemonsList,
        types: dataTypes.results,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
      props: { error },
    };
  }
};

export { default } from "@/screens/HomeScreen";
