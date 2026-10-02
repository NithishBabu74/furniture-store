import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import Features from "../components/layout/Features";
import ProductCard from "../components/product/ProductCard";
import PageBanner from "../components/layout/PageBanner";
import { useStore } from "../store/StoreContext";

export default function Wishlist() {
  const { liked } = useStore();
  const [all, setAll] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts().then(setAll).catch(() => setFailed(true));
  }, []);

  const items = (all ?? []).filter((p) => liked.includes(p.id));

  return (
    <>
      <PageBanner title="Wishlist" />
      <section className="products shop-results">
        {failed && <p className="sub">Products could not be loaded. Refresh to try again.</p>}
        {!failed && !all && <p className="sub">Loading…</p>}
        {all && items.length === 0 && (
          <div className="notice">
            <p>Your wishlist is empty. Tap Like on any product to save it here.</p>
            <Link className="btn small" to="/shop">Browse the shop</Link>
          </div>
        )}
        <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
      <Features />
    </>
  );
}
