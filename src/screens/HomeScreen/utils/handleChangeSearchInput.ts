import setState from "@/types/setState";

function handleChangeSearchInput(
  e: React.ChangeEvent<HTMLInputElement>,
  setSearchInput: setState<string>
) {
  setSearchInput(e.target.value);
}

export default handleChangeSearchInput;
