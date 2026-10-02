import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageBanner from "../components/layout/PageBanner";
import { fetchProducts } from "../services/api";
import Features from "../components/layout/Features";
import ProductCard from "../components/product/ProductCard";

const PER_PAGE_OPTIONS = [8, 16, 32];

const SORTS = [
  { value: "default", label: "Default", fn: null },
  { value: "price-asc", label: "Price: Low to High", fn: (a, b) => a.price - b.price },
  { value: "price-desc", label: "Price: High to Low", fn: (a, b) => b.price - a.price },
  { value: "name-asc", label: "Name: A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
  { value: "name-desc", label: "Name: Z to A", fn: (a, b) => b.name.localeCompare(a.name) },
];

const NO_FILTERS = { categories: [], min: "", max: "", sale: false };

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [view, setView] = useState("grid");
  const [perPage, setPerPage] = useState(16);
  const [sort, setSort] = useState("default");
  const [filters, setFilters] = useState(NO_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts()
      .then((data) => { setProducts(data); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);

  // any change to filters / sort / page size starts again from page 1
  useEffect(() => setPage(1), [filters, sort, perPage, q]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), [products]);

  const filtered = useMemo(() => {
    const { categories: cats, min, max, sale } = filters;
    const list = products.filter((p) =>
      (!cats.length || cats.includes(p.category)) &&
      (min === "" || p.price >= Number(min)) &&
      (max === "" || p.price <= Number(max)) &&
      (!sale || p.discount) &&
      (!q || `${p.name} ${p.description} ${p.category} ${p.brand ?? ""} ${p.tags.join(" ")}`.toLowerCase().includes(q))
    );
    const fn = SORTS.find((s) => s.value === sort)?.fn;
    return fn ? [...list].sort(fn) : list;
  }, [products, filters, sort, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pages);
  const start = (current - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const activeCount =
    filters.categories.length + (filters.min !== "") + (filters.max !== "") + filters.sale;

  const toggleCategory = (c) =>
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(c) ? f.categories.filter((x) => x !== c) : [...f.categories, c],
    }));

  const goToPage = (n) => {
    setPage(n);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageBanner title="Shop" />

      <div className="toolbar">
        <div className="tool-left">
          <button className={`filter-btn ${showFilters ? "on" : ""}`} onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters}>
            ⚟ Filter{activeCount > 0 && <span className="count">{activeCount}</span>}
          </button>
          <button className={`view-btn ${view === "grid" ? "on" : ""}`} onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"}>▦</button>
          <button className={`view-btn ${view === "list" ? "on" : ""}`} onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"}>☰</button>
          <span className="divider" />
          <span className="showing">
            {filtered.length
              ? `Showing ${start + 1}–${start + visible.length} of ${filtered.length} results`
              : "Showing 0 results"}
          </span>
        </div>
        <div className="tool-right">
          <label>Show
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
              {PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label>Short by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <fieldset>
            <legend>Category</legend>
            {categories.map((c) => (
              <label key={c}><input type="checkbox" checked={filters.categories.includes(c)} onChange={() => toggleCategory(c)} /> {c}</label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Price ($)</legend>
            <div className="range-inputs">
              <input type="number" min="0" placeholder="Min" value={filters.min} onChange={(e) => setFilters((f) => ({ ...f, min: e.target.value }))} />
              <span>to</span>
              <input type="number" min="0" placeholder="Max" value={filters.max} onChange={(e) => setFilters((f) => ({ ...f, max: e.target.value }))} />
            </div>
          </fieldset>
          <fieldset>
            <legend>Offers</legend>
            <label><input type="checkbox" checked={filters.sale} onChange={(e) => setFilters((f) => ({ ...f, sale: e.target.checked }))} /> On sale</label>
          </fieldset>
          <button className="btn outline clear" onClick={() => setFilters(NO_FILTERS)} disabled={!activeCount}>Clear filters</button>
        </div>
      )}

      <section id="results" className="products shop-results">
        {q && <p className="sub">Results for “{params.get("q")}” · <button className="link" onClick={() => setParams({})}>Clear search</button></p>}
        {status === "loading" && <p className="sub">Loading products…</p>}
        {status === "error" && <p className="sub">Products could not be loaded. Refresh to try again.</p>}
        {status === "ready" && !filtered.length && (
          <p className="sub">No products match. <button className="link" onClick={() => { setFilters(NO_FILTERS); setParams({}); }}>Clear filters</button></p>
        )}
        <div className={`grid ${view}`}>
          {visible.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        {pages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            <button disabled={current === 1} onClick={() => goToPage(current - 1)}>Prev</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} className={n === current ? "on" : ""} aria-current={n === current ? "page" : undefined} onClick={() => goToPage(n)}>{n}</button>
            ))}
            <button disabled={current === pages} onClick={() => goToPage(current + 1)}>Next</button>
          </nav>
        )}
      </section>

      <Features />
    </>
  );
}
