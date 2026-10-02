// Click a category to filter; click it again to clear.
export default function CategoryList({ categories, active, onSelect }) {
  return (
    <div className="mt-10 px-4">
      <h3 className="text-2xl font-medium text-black">Categories</h3>
      <ul className="m-0 mt-6 flex list-none flex-col gap-5 p-0">
        {categories.map(({ name, count }) => (
          <li key={name}>
            <button
              onClick={() => onSelect(active === name ? "" : name)}
              aria-pressed={active === name}
              className={`flex w-full cursor-pointer justify-between border-0 bg-transparent p-0 text-left text-[15px] ${active === name ? "text-[#b88e2f]" : "text-[#9f9f9f] hover:text-[#b88e2f]"}`}
            >
              <span>{name}</span><span>{count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
