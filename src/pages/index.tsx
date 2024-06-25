import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import HomeScreen from "@/screens/HomeScreen";
import getPokemonsList from "@/service/getPokemonsList";
import { InferGetStaticPropsType } from "next";
import { pokemonCard } from "@/types/pokemon";
import handleSentry from "@/screens/HomeScreen/utils/handleSentry";
import Header from "@/components/Header";

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

export const HomePageContext = createContext(null);

export default function HomePage({
  initialPokemonsList,
  initialUrlPokemonsList,
  baseUrlPokemonsList,
  types,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [urlPokemonsList, setUrlPokemonsList] = useState(
    initialUrlPokemonsList
  );
  const [pokemonsList, setPokemonsList] =
    useState<pokemonCard[]>(initialPokemonsList);

  const sentryRef = useRef(null);
  const sentry = useMemo(() => new handleSentry(sentryRef), [sentryRef]);
  const [sentryIsVisble, setSentryIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setSentryIsVisible(entries[0].isIntersecting);
    });

    observer.observe(sentry.get());

    return () => observer.disconnect();
  }, [sentry]);

  useEffect(() => {
    if (urlPokemonsList === null) {
      sentry.disable();
      return;
    }

    if (sentryIsVisble) {
      getPokemonsList(urlPokemonsList, {
        local: "client",
        clientNotifiers: {
          url: setUrlPokemonsList,
          pokemonsList: setPokemonsList,
        },
      });
    }
  }, [sentryIsVisble, urlPokemonsList, sentry]);

  const context = {
    setPokemonsList,
    setUrlPokemonsList,
    sentryRef,
    sentry,
    baseUrlPokemonsList,
    pokemonsList,
    types,
    urlPokemonsList,
  };

  return (
    <HomePageContext.Provider value={context}>
      <Header />
      <HomeScreen />
    </HomePageContext.Provider>
  );
}
