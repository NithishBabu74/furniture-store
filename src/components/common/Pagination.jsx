export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const base = "h-12 min-w-12 rounded-[10px] px-4 text-base cursor-pointer disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <nav className="mt-6 mb-4 flex flex-wrap justify-center gap-3" aria-label="Pagination">
      <button className={`${base} bg-[#f9f1e7]`} disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          className={`${base} ${n === page ? "bg-[#b88e2f] text-white" : "bg-[#f9f1e7]"}`}
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button className={`${base} bg-[#f9f1e7]`} disabled={page === pages} onClick={() => onChange(page + 1)}>Next</button>
    </nav>
  );
}
