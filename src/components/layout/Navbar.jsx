import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import useGoTo from "../../utils/useGoTo";
import { useStore } from "../../store/StoreContext";

const SECTIONS = ["home", "about"];

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const UserIcon = () => <Icon><circle cx="9" cy="8" r="4" /><path d="M2.5 21c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /></Icon>;
const SearchIcon = () => <Icon><circle cx="11" cy="11" r="7" /><path d="m20 20-3.8-3.8" /></Icon>;
const HeartIcon = () => <Icon><path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11Z" /></Icon>;
const CartIcon = () => <Icon><path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2" /><circle cx="10" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></Icon>;

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goTo = useGoTo();
  const { count, setCartOpen, liked, orders } = useStore();
  const [active, setActive] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => { setSearchOpen(false); }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [pathname]);

  const current = pathname === "/shop" ? "shop" : pathname === "/contact" ? "contact" : pathname === "/" ? active : "";
  const cls = (id) => (current === id ? "active" : "");

  const search = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    setSearchOpen(false);
  };

  return (
    <header className="nav">
      <Link className="logo" to="/" aria-label="Furniro home" onClick={(e) => goTo(e, "home")}><Logo /></Link>
      <nav aria-label="Main">
        <a href="/" className={cls("home")} onClick={(e) => goTo(e, "home")}>Home</a>
        <Link to="/shop" className={cls("shop")}>Shop</Link>
        <a href="/#about" className={cls("about")} onClick={(e) => goTo(e, "about")}>About</a>
        <Link to="/contact" className={cls("contact")}>Contact</Link>
      </nav>
      <div className="nav-icons">
        <Link to="/orders" className="icon-btn hide-sm" aria-label="My account and orders" title="My orders">
          <UserIcon />{orders.length > 0 && <span className="dot" />}
        </Link>
        <button className="icon-btn hide-sm" onClick={() => setSearchOpen((o) => !o)} aria-label="Search products" aria-expanded={searchOpen} title="Search"><SearchIcon /></button>
        <Link to="/wishlist" className="icon-btn hide-sm" aria-label={`Wishlist, ${liked.length} items`} title="Wishlist">
          <HeartIcon />{liked.length > 0 && <span className="cart-count">{liked.length}</span>}
        </Link>
        <button className="icon-btn cart-btn" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`} title="Cart">
          <CartIcon />{count > 0 && <span className="cart-count">{count}</span>}
        </button>
      </div>
      {searchOpen && (
        <form className="nav-search" onSubmit={search} role="search">
          <input autoFocus type="search" placeholder="Search sofa, bed, table, lamp…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)} />
          <button className="btn small" type="submit">Search</button>
        </form>
      )}
    </header>
  );
}
