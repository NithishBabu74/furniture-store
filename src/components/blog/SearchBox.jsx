import { useState } from "react";
import { FiSearch } from "react-icons/fi";

// `live` = filter while typing (blog list). Otherwise only on Enter / icon click.
export default function SearchBox({ initial = "", onSearch, live = false }) {
  const [value, setValue] = useState(initial);

  const change = (e) => {
    setValue(e.target.value);
    if (live) onSearch(e.target.value.trim());
  };
  const submit = (e) => { e.preventDefault(); onSearch(value.trim()); };

  return (
    <form onSubmit={submit} role="search" className="flex h-[52px] items-center rounded-[10px] border border-[#9f9f9f] px-4">
      <input
        type="search"
        value={value}
        onChange={change}
        placeholder="Search posts"
        aria-label="Search posts"
        className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm outline-none"
      />
      <button type="submit" aria-label="Search" className="cursor-pointer border-0 bg-transparent p-1 text-lg text-black">
        <FiSearch />
      </button>
    </form>
  );
}
