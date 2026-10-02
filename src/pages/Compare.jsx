import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import BannerLogo from "../components/common/BannerLogo";
import Features from "../components/layout/Features";
import Stars from "../components/common/Stars";
import { money } from "../utils/money";
import { useStore } from "../store/StoreContext";

export default function Compare() {
  const { compare, addCompare, removeCompare, maxCompare, addToCart } = useStore();
  const [all, setAll] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts().then(setAll).catch(() => setAll([]));
  }, []);

  const items = compare.map((id) => (all ?? []).find((p) => p.id === id)).filter(Boolean);
  const choices = (all ?? []).filter((p) => !compare.includes(p.id));

  const pick = (e) => {
    const chosen = choices.find((p) => String(p.id) === e.target.value);
    if (chosen) addCompare(chosen.id);
  };

  // every product has the same sections and rows, so labels come from the first one
  const sections = items.length
    ? items[0].specs.map((sec, i) => ({
        title: sec.title,
        rows: sec.rows.map(([label], r) => [label, items.map((p) => p.specs[i].rows[r][1])]),
      }))
    : [];

  return (
    <>
      <section className="shop-banner">
        <BannerLogo />
        <h1>Product Comparison</h1>
        <p><Link to="/"><b>Home</b></Link> › Comparison</p>
      </section>

      <section className="cmp">
        <div className="cmp-grid cmp-head">
          <div className="cmp-intro">
            <h2>Go to Product page for more Products</h2>
            <Link to="/shop" className="underline">View More</Link>
          </div>

          {items.map((p) => (
            <div key={p.id} className="cmp-card">
              <Link to={`/product/${p.id}`} className="cmp-img"><img src={p.image} alt={p.name} /></Link>
              <h3>{p.name}</h3>
              <p className="cmp-price">{money(p.price)}</p>
              <p className="cmp-rate"><b>{p.rating}</b> <Stars value={p.rating} /> <span className="vbar" /> <small>{p.reviews} Review</small></p>
              <button className="link" onClick={() => removeCompare(p.id)}>Remove</button>
            </div>
          ))}

          {items.length < maxCompare && (
            <div className="cmp-add">
              <strong>Add A Product</strong>
              <select value="" onChange={pick} disabled={!choices.length} aria-label="Choose a product to compare">
                <option value="" disabled>Choose a Product</option>
                {choices.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          )}
        </div>

        {!all && <p className="notice">Loading…</p>}
        {all && items.length === 0 && <p className="notice">Choose a product to start comparing. You can compare up to {maxCompare}.</p>}

        {sections.map((sec) => (
          <div key={sec.title} className="cmp-section">
            <div className="cmp-grid cmp-title"><h3>{sec.title}</h3>{items.map((p) => <div key={p.id} className="cell" />)}</div>
            {sec.rows.map(([label, values]) => (
              <div key={label} className="cmp-grid cmp-row">
                <div className="lbl">{label}</div>
                {values.map((v, i) => <div key={items[i].id} className="cell">{v}</div>)}
              </div>
            ))}
          </div>
        ))}

        {items.length > 0 && (
          <div className="cmp-grid cmp-actions">
            <div />
            {items.map((p) => (
              <div key={p.id} className="cell">
                <button className="btn small" onClick={() => addToCart(p)}>Add To Cart</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Features />
    </>
  );
}
