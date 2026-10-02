// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import BannerLogo from "../components/common/BannerLogo";
// import Features from "../components/layout/Features";
// import Qty from "../components/common/Qty";
// import TrashIcon from "../components/common/TrashIcon";
// import { money } from "../utils/money";
// import { useStore } from "../store/StoreContext";

// export default function Cart() {
//   const { cart, subtotal, setQty, removeItem, clearCart } = useStore();
//   useEffect(() => window.scrollTo(0, 0), []);

//   return (
//     <>
//       <section className="shop-banner">
//         <BannerLogo />
//         <h1>Cart</h1>
//         <p><Link to="/"><b>Home</b></Link> › Cart</p>
//       </section>

//       <section className="cart-page">
//         {cart.length === 0 ? (
//           <div className="notice">
//             <p>Your cart is empty.</p>
//             <Link className="btn small" to="/shop">Return to shop</Link>
//           </div>
//         ) : (
//           <>
//             <div className="cart-main">
//               <table className="cart-table">
//                 <thead>
//                   <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th><span className="sr-only">Remove</span></th></tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((it) => (
//                     <tr key={it.key}>
//                       <td>
//                         <div className="cart-prod">
//                           <Link to={`/product/${it.id}`} className="cart-thumb"><img src={it.image} alt={it.name} /></Link>
//                           <div>
//                             <Link to={`/product/${it.id}`}>{it.name}</Link>
//                             {(it.size || it.color) && <small>{[it.size && `Size ${it.size}`, it.color].filter(Boolean).join(" · ")}</small>}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="muted-cell">{money(it.price)}</td>
//                       <td><Qty value={it.qty} onChange={(q) => setQty(it.key, q)} compact /></td>
//                       <td>{money(it.price * it.qty)}</td>
//                       <td><button className="trash" onClick={() => removeItem(it.key)} aria-label={`Remove ${it.name} from cart`}><TrashIcon /></button></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="cart-links">
//                 <Link to="/shop" className="underline">Continue shopping</Link>
//                 <button className="link" onClick={clearCart}>Clear cart</button>
//               </div>
//             </div>

//             <aside className="cart-total">
//               <h2>Cart Totals</h2>
//               <p><span>Subtotal</span><span className="muted-cell">{money(subtotal)}</span></p>
//               <p><span>Total</span><strong>{money(subtotal)}</strong></p>
//               <Link className="pill checkout-btn" to="/checkout">Check Out</Link>
//             </aside>
//           </>
//         )}
//       </section>

//       <Features />
//     </>
//   );
// }





import { useEffect } from "react";
import { Link } from "react-router-dom";
import BannerLogo from "../components/common/BannerLogo";
import Features from "../components/layout/Features";
import Qty from "../components/common/Qty";
import TrashIcon from "../components/common/TrashIcon";
import { money } from "../utils/money";
import { useStore } from "../store/StoreContext";

export default function Cart() {
  const { cart, subtotal, setQty, removeItem, clearCart } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="shop-banner">
        <BannerLogo />
        <h1>Shopping Cart</h1>
        <p>
          <Link to="/"><b>Home</b></Link> › Cart
        </p>
      </section>

      <section className="cart-page">
        {cart.length === 0 ? (
          <div className="notice cart-empty">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link className="btn small" to="/shop">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-main">
              <div className="cart-heading">
                <div>
                  <h2>Your Items</h2>
                  <p>{cart.length} product(s) in your cart</p>
                </div>

                <button className="cart-clear" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>

              <div className="cart-items">
                {cart.map((it) => (
                  <article className="cart-item" key={it.key}>
                    <Link
                      to={`/product/${it.id}`}
                      className="cart-item-image"
                    >
                      <img src={it.image} alt={it.name} />
                    </Link>

                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          <Link
                            to={`/product/${it.id}`}
                            className="cart-item-name"
                          >
                            {it.name}
                          </Link>

                          {(it.size || it.color) && (
                            <p className="cart-item-variant">
                              {[
                                it.size && `Size: ${it.size}`,
                                it.color && `Color: ${it.color}`,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          )}
                        </div>

                        <button
                          className="cart-remove"
                          onClick={() => removeItem(it.key)}
                          aria-label={`Remove ${it.name} from cart`}
                          title="Remove item"
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      <div className="cart-item-bottom">
                        <div className="cart-item-price">
                          <span>Price</span>
                          <strong>{money(it.price)}</strong>
                        </div>

                        <div className="cart-item-quantity">
                          <span>Quantity</span>
                          <Qty
                            value={it.qty}
                            onChange={(q) => setQty(it.key, q)}
                            compact
                          />
                        </div>

                        <div className="cart-item-subtotal">
                          <span>Subtotal</span>
                          <strong>{money(it.price * it.qty)}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-bottom-links">
                <Link to="/shop" className="cart-continue">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            <aside className="cart-summary">
              <div className="cart-summary-heading">
                <h2>Cart Summary</h2>
                <span>{cart.length} items</span>
              </div>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>

              <div className="cart-summary-row">
                <span>Shipping</span>
                <strong className="cart-free">Free</strong>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-summary-total">
                <span>Total</span>
                <strong>{money(subtotal)}</strong>
              </div>

              <p className="cart-summary-note">
                Shipping and taxes are calculated at checkout.
              </p>

              <Link className="cart-checkout-btn" to="/checkout">
                Proceed to Checkout
                <span>→</span>
              </Link>

              <Link to="/shop" className="cart-back-link">
                Continue Shopping
              </Link>

              <div className="cart-secure">
                <span>🔒</span>
                Secure checkout
              </div>
            </aside>
          </div>
        )}
      </section>

      <Features />
    </>
  );
}