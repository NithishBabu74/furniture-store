import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/product/ProductCard";
import diningJpeg from "../assets/dining.jpeg";
import diningPng from "../assets/dining.png";
import livingJpeg from "../assets/living.jpeg";

const INITIAL_COUNT = 8; // first grid (2 rows of 4)
const STEP = 8; // "Show More" reveals the next 8

// each category opens the shop already searched for matching products
const RANGE = [
  { name: "All", icon: "✦", q: "" },
  { name: "Sofas", icon: "🛋️", q: "sofa" },
  { name: "Chairs", icon: "🪑", q: "chair" },
  { name: "Tables", icon: "▤", q: "table" },
  { name: "Beds", icon: "🛏️", q: "bed" },
  { name: "Lighting", icon: "💡", q: "lamp" },
  { name: "Decor", icon: "🌿", q: "decor" },
];

const ROOMS = [
  { type: "Bed Room", title: "Inner Peace", img: livingJpeg },
  { type: "Dining Room", title: "Sunday Table", img: diningJpeg },
  { type: "Living Room", title: "Warm Corner", img: diningPng },
  { type: "Study", title: "Quiet Desk", img: livingJpeg },
];

function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    fetchProducts()
      .then((data) => { setProducts(data); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);
  return { products, status };
}


function Hero() {
  return (
    <section id="home" className="hero luxury-hero reference-hero">
      <div className="reference-hero-overlay" />
      <div className="reference-hero-copy">
        <small>MODERN LIVING</small>
        <h1>Luxury Furniture<br />For Your Dream Home</h1>
        <p>Stylish. Comfortable. Timeless.<br />Make every space beautiful with Furniro.</p>
        <Link className="btn reference-hero-btn" to="/shop">Shop Now <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}

function Range() {
  return (
    <section className="range luxury-range reference-categories" aria-label="Furniture categories">
      <div className="category-strip">
        {RANGE.map((r) => (
          <Link
            key={r.name}
            to={r.q ? `/shop?q=${r.q}` : "/shop"}
            className="category-tile"
            aria-label={`Shop ${r.name}`}
          >
            <span className="category-icon" aria-hidden="true">{r.icon}</span>
            <span>{r.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Products({ products, status }) {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const hasMore = visible < products.length;

  return (
    <section id="products" className="products luxury-products">
      <div className="section-kicker">HANDPICKED FOR YOU</div>
      <h2>Our Products</h2>
      <p className="sub">Premium pieces with timeless design, selected for modern living.</p>
      {status === "loading" && <p className="sub">Loading products…</p>}
      {status === "error" && <p className="sub">Products could not be loaded. Check your internet connection and refresh.</p>}
      <div className="grid">
        {products.slice(0, visible).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {hasMore && (
        <button className="btn outline" onClick={() => setVisible((v) => v + STEP)}>Show More</button>
      )}
      {!hasMore && products.length > 0 && <Link className="btn outline" to="/shop">View In Shop</Link>}
    </section>
  );
}

function About({ products }) {
  const [i, setI] = useState(0);
  const next = () => setI((n) => (n + 1) % ROOMS.length);
  const shown = [ROOMS[i], ROOMS[(i + 1) % ROOMS.length]];
  // customer-setup gallery uses real product photos from the API
  const gallery = products.slice(0, 8).map((p) => ({ id: p.id, name: p.name, src: p.images[1] ?? p.image }));

  return (
    <>
      <section id="about" className="inspire">
        <div className="inspire-text">
          <h2>50+ Beautiful rooms inspiration</h2>
          <p>Our designers have already put together a lot of beautiful room layouts to inspire you.</p>
          <Link className="btn small" to="/blog">Explore More</Link>
        </div>
        <div className="slides">
          {shown.map((r, idx) => (
            <div key={r.title} className={`slide ${idx === 0 ? "main" : ""}`}>
              <img src={r.img} alt={`${r.type}: ${r.title}`} />
              {idx === 0 && (
                <div className="caption">
                  <small>0{i + 1} — {r.type}</small>
                  <strong>{r.title}</strong>
                </div>
              )}
            </div>
          ))}
          <button className="next" onClick={next} aria-label="Next room">›</button>
          <div className="dots">
            {ROOMS.map((_, d) => <span key={d} className={d === i ? "on" : ""} onClick={() => setI(d)} />)}
          </div>
        </div>
      </section>
      {gallery.length > 0 && (
        <section className="share">
          <small>Share your setup with</small>
          <h2>#FuniroFurniture</h2>
          <div className="masonry">
            {gallery.map((g) => (
              <Link key={g.id} to={`/product/${g.id}`} aria-label={g.name}><img src={g.src} alt={g.name} loading="lazy" /></Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function Home() {
  const { state } = useLocation();
  const { products, status } = useProducts();
  useEffect(() => {
    if (state?.scrollTo) setTimeout(() => document.getElementById(state.scrollTo)?.scrollIntoView(), 80);
    else window.scrollTo(0, 0);
  }, [state]);
  return (<><Hero /><Range /><Products products={products} status={status} /><About products={products} /></>);
}
