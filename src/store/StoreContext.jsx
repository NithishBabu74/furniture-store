import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const MAX_COMPARE = 3;
const clamp = (n) => Math.max(1, Math.min(99, n));

function cartReducer(items, a) {
  switch (a.type) {
    case "add": {
      const found = items.some((x) => x.key === a.item.key);
      return found
        ? items.map((x) => (x.key === a.item.key ? { ...x, qty: clamp(x.qty + a.item.qty) } : x))
        : [...items, a.item];
    }
    case "qty": return items.map((x) => (x.key === a.key ? { ...x, qty: clamp(a.qty) } : x));
    case "remove": return items.filter((x) => x.key !== a.key);
    case "clear": return [];
    default: return items;
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, () => load("furniro-cart", []));
  const [compare, setCompare] = useState(() => load("furniro-compare", []));
  const [orders, setOrders] = useState(() => load("furniro-orders", []));
  const [liked, setLiked] = useState(() => load("furniro-liked", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { try { localStorage.setItem("furniro-cart", JSON.stringify(cart)); } catch { /* storage unavailable */ } }, [cart]);
  useEffect(() => { try { localStorage.setItem("furniro-compare", JSON.stringify(compare)); } catch { /* ignore */ } }, [compare]);
  useEffect(() => { try { localStorage.setItem("furniro-orders", JSON.stringify(orders)); } catch { /* ignore */ } }, [orders]);
  useEffect(() => { try { localStorage.setItem("furniro-liked", JSON.stringify(liked)); } catch { /* ignore */ } }, [liked]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((message, link) => setToast({ message, link, id: Date.now() }), []);

  const addToCart = (p, { qty = 1, size = null, color = null } = {}) => {
    dispatch({ type: "add", item: { key: `${p.id}-${size}-${color}`, id: p.id, name: p.name, image: p.image, price: p.price, qty, size, color } });
    setCartOpen(true);
  };

  const addCompare = (id) => {
    if (compare.includes(id)) return;
    if (compare.length >= MAX_COMPARE) {
      notify(`You can compare up to ${MAX_COMPARE} products. Remove one first.`);
      return;
    }
    setCompare([...compare, id]);
  };
  const removeCompare = (id) => setCompare(compare.filter((x) => x !== id));

  const toggleLike = (id) =>
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  // Saves the cart as an order (with the customer's details), then empties the cart.
  const placeOrder = (customer) => {
    const order = {
      id: `FR-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((n, x) => n + x.qty * x.price, 0),
      customer,
    };
    setOrders((o) => [order, ...o]);
    dispatch({ type: "clear" });
    return order;
  };

  const count = cart.reduce((n, x) => n + x.qty, 0);
  const subtotal = cart.reduce((n, x) => n + x.qty * x.price, 0);

  return (
    <Ctx.Provider value={{
      cart, count, subtotal, cartOpen, setCartOpen, addToCart,
      setQty: (key, qty) => dispatch({ type: "qty", key, qty }),
      removeItem: (key) => dispatch({ type: "remove", key }),
      orders, placeOrder,
      clearCart: () => dispatch({ type: "clear" }),
      compare, addCompare, removeCompare, maxCompare: MAX_COMPARE, liked, toggleLike, toast, notify,
    }}>
      {children}
    </Ctx.Provider>
  );
}
