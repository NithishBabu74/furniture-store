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
  { name: "Dining", img: diningJpeg, q: "table" },
  { name: "Living", img: diningPng, q: "sofa" },
  { name: "Bedroom", img: livingJpeg, q: "bed" },
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
    <section id="home" className="hero">
      <Link
        className="hero-buy-link"
        to="/shop"
        aria-label="Buy now and explore our shop"
      >
        BUY NOW
      </Link>
    </section>
  );
}

function Range() {
  return (
    <section className="range">
      <h2>Browse The Range</h2>
      <p className="sub">Find the right piece for every room in your home.</p>
      <div className="range-grid">
        {RANGE.map((r) => (
          <Link key={r.name} to={`/shop?q=${r.q}`} className="range-item" aria-label={`Shop ${r.name}`}>
            <figure>
              <img src={r.img} alt={`${r.name} room furniture`} />
              <figcaption>{r.name}</figcaption>
            </figure>
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
    <section id="products" className="products">
      <h2>Our Products</h2>
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
