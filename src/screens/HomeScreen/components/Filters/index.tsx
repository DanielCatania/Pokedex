import React, { useContext, useState } from "react";

import { HomePageContext } from "@/pages";

import handleChangePokemonFilterType from "../../utils/handleChangePokemonFilterType";
import handleWithPokemonSearch from "../../utils/handleWithPokemonSearch";
import handleChangeSearchInput from "../../utils/handleChangeSearchInput";
import returnToInitialPokemonsList from "../../utils/returnToInitialPokemonsList";

export default function Filters() {
  const [searchInput, setSearchInput] = useState("");

  const {
    setPokemonsList,
    setUrlPokemonsList,
    baseUrlPokemonsList,
    types,
    sentry,
  } = useContext(HomePageContext);

  return (
    <>
      <button
        onClick={(e) =>
          returnToInitialPokemonsList(
            baseUrlPokemonsList,
            setUrlPokemonsList,
            setPokemonsList,
            sentry
          )
        }
      >
        reset filters
      </button>
      <form
        onSubmit={(e) =>
          handleWithPokemonSearch(
            e,
            searchInput,
            setSearchInput,
            setPokemonsList,
            sentry
          )
        }
      >
        <input
          type="text"
          placeholder="Search pokemon by name"
          value={searchInput}
          onChange={(e) => handleChangeSearchInput(e, setSearchInput)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </form>
      <select
        name="type"
        id="type"
        onChange={(e) =>
          handleChangePokemonFilterType(
            e,
            setPokemonsList,
            setUrlPokemonsList,
            baseUrlPokemonsList,
            sentry
          )
        }
      >
        <option value="base">Find Pokemon By Type</option>
        {types.map((type, i) => (
          <option key={type.name + i} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>
    </>
  );
}
