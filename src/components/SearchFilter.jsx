import { useState } from "react";
import { Input } from "./ui/input";

const SearchFilter  = (props) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className="flex w-[90%] justify-end">
      <Input
        placeholder="Search for deals or restaurants"
        className={props.className}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  )
}

export default SearchFilter;