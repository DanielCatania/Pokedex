import { GetServerSidePropsContext } from "next";
import { pokemonMove } from "@/types/pokemon";
interface IgetServerSideProps {
  props: {
    movesData?: {
      id: string;
      pokemonName: string;
      moves: pokemonMove[];
    };
  };
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${ctx.params.id}/`;
    const response = await fetch(url);
    const data = await response.json();

    const movesPromises = data.moves.map(async (callingCard) => {
      try {
        const { name } = callingCard.move;

        const response = await fetch(callingCard.move.url);
        const moveDescription = await response.json();

        const move: pokemonMove = {
          id: moveDescription.id,
          name,
          effect: moveDescription.effect_entries[0].short_effect,
        };

        return move;
      } catch (error) {
        return {
          id: "error",
          name: "error",
          effect: "error",
        };
      }
    });

    const moves = await Promise.all(movesPromises);

    const movesData = {
      id: data.id,
      pokemonName: data.name,
      moves,
    };
    return {
      props: {
        movesData,
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

export { default } from "@/screens/PokemonScreen/moves";
