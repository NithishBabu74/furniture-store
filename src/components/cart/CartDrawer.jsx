import { useEffect } from "react";
import { Link } from "react-router-dom";
import Qty from "../common/Qty";
import { money } from "../../utils/money";
import { useStore } from "../../store/StoreContext";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, subtotal, setQty, removeItem } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;
  const close = () => setCartOpen(false);

  return (
    <div className="drawer-wrap">
      <div className="drawer-backdrop" onClick={close} />
      <aside className="drawer" role="dialog" aria-label="Shopping cart">
        <div className="drawer-head">
          <h2>Shopping Cart</h2>
          <button onClick={close} aria-label="Close cart">✕</button>
        </div>
        {cart.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <Link className="btn small" to="/shop" onClick={close}>Browse the shop</Link>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {cart.map((it) => (
                <li key={it.key}>
                  <img src={it.image} alt={it.name} />
                  <div>
                    <Link to={`/product/${it.id}`} onClick={close}><strong>{it.name}</strong></Link>
                    <small>{[it.size, it.color].filter(Boolean).join(" / ")}</small>
                    <Qty value={it.qty} onChange={(q) => setQty(it.key, q)} compact />
                    <span className="price">{money(it.price * it.qty)}</span>
                  </div>
                  <button className="remove" onClick={() => removeItem(it.key)} aria-label={`Remove ${it.name}`}>✕</button>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <p><span>Subtotal</span><strong>{money(subtotal)}</strong></p>
              <div className="drawer-btns">
                <Link className="btn small outline-btn" to="/cart" onClick={close}>View Cart</Link>
                <Link className="btn small" to="/checkout" onClick={close}>Check Out</Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
