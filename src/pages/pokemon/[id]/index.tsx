import { GetServerSidePropsContext } from "next";
import pokemonData from "@/types/pokemon";
import PokemonScreen from "@/screens/PokemonScreen";
import { InferGetServerSidePropsType } from "next";

interface IgetServerSideProps {
  props: {
    pokemonData?: pokemonData;
  };
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${ctx.params.id}/`;
    const response = await fetch(url);
    const data = await response.json();

    const types: string[] = [];
    data.types.forEach(({ type }) => types.push(type.name));

    const abilities: string[] = [];
    data.abilities.forEach(({ ability }) => abilities.push(ability.name));

    const pokemonData = {
      id: data.id,
      name: data.name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      types,
      abilities,
      weight: data.weight,
      height: data.height,
    };
    return {
      props: {
        pokemonData,
      },
    } satisfies IgetServerSideProps;
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}

export default function PokemonPage({
  pokemonData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const PokemonScreenProps = { pokemonData };
  return <PokemonScreen {...PokemonScreenProps} />;
}
