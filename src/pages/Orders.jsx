// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import BannerLogo from "../components/common/BannerLogo";
// import Features from "../components/layout/Features";
// import { money } from "../utils/money";
// import { useStore } from "../store/StoreContext";

// export default function Orders() {
//   const { orders } = useStore();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <section className="shop-banner">
//         <BannerLogo />
//         <h1>My Orders</h1>
//         <p>
//           <Link to="/">
//             <b>Home</b>
//           </Link>{" "}
//           › Orders
//         </p>
//       </section>

//       <section className="orders">
//         {orders.length === 0 ? (
//           <div className="notice">
//             <p>You have not placed any orders yet.</p>
//             <Link className="btn small" to="/shop">
//               Start shopping
//             </Link>
//           </div>
//         ) : (
//           orders.map((o) => {
//             const c = o.customer;
//             return (
//               <article key={o.id} className="order">
//                 <header>
//                   <div>
//                     <small>Order number</small>
//                     <strong>{o.id}</strong>
//                   </div>
//                   <div>
//                     <small>Order placed on</small>
//                     <span>{new Date(o.date).toLocaleString()}</span>
//                   </div>
//                   <div>
//                     <small>Payment</small>
//                     <span>{c.payment}</span>
//                   </div>
//                   <div>
//                     <small>Total</small>
//                     <strong className="gold">{money(o.total)}</strong>
//                   </div>
//                 </header>

//                 <ul>
//                   {o.items.map((it) => (
//                     <li key={it.key}>
//                       <Link
//                         to={`/product/${it.id}`}
//                         className="cart-thumb"
//                       >
//                         <img src={it.image} alt={it.name} />
//                       </Link>
//                       <div>
//                         <Link to={`/product/${it.id}`}>
//                           <strong>{it.name}</strong>
//                         </Link>
//                         <small>
//                           {[it.size && `Size ${it.size}`, it.color]
//                             .filter(Boolean)
//                             .join(" · ")}
//                         </small>
//                         <small>
//                           {money(it.price)} × {it.qty}
//                         </small>
//                       </div>
//                       <span>{money(it.price * it.qty)}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <footer>
//                   <small>Delivering to</small>
//                   <span>
//                     {c.firstName} {c.lastName}, {c.street}, {c.city}
//                     {c.province && `, ${c.province}`}, {c.zip}, {c.country}.{" "}
//                     {c.phone}
//                   </span>
//                 </footer>
//               </article>
//             );
//           })
//         )}
//       </section>

//       <Features />
//     </>
//   );
// }




import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../components/layout/PageBanner";
import Features from "../components/layout/Features";
import { money } from "../utils/money";
import { useStore } from "../store/StoreContext";

export default function Orders() {
  const { orders } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageBanner title="My Orders" />

      <section className="orders">
        <div className="orders-intro">
          <h2>Order History</h2>
          <p>Here you can see all the orders you have placed and the date and time each order was placed.</p>
        </div>

        {orders.length === 0 ? (
          <div className="notice">
            <p>You have not placed any orders yet.</p>
            <Link className="btn small" to="/shop">
              Start shopping
            </Link>
          </div>
        ) : (
          orders.map((o) => {
            const c = o.customer;

            return (
              <article key={o.id} className="order">
                <header>
                  <div>
                    <small>Order number</small>
                    <strong>{o.id}</strong>
                  </div>

                  <div>
                    <small>Order placed on</small>
                    <span>{new Date(o.date).toLocaleString()}</span>
                  </div>

                  <div>
                    <small>Payment</small>
                    <span>{c.payment}</span>
                  </div>

                  <div>
                    <small>Total</small>
                    <strong className="gold">{money(o.total)}</strong>
                  </div>
                </header>

                <ul>
                  {o.items.map((it) => (
                    <li key={it.key}>
                      <Link
                        to={`/product/${it.id}`}
                        className="cart-thumb"
                      >
                        <img src={it.image} alt={it.name} />
                      </Link>

                      <div>
                        <Link to={`/product/${it.id}`}>
                          <strong>{it.name}</strong>
                        </Link>

                        <small>
                          {[it.size && `Size ${it.size}`, it.color]
                            .filter(Boolean)
                            .join(" · ")}
                        </small>

                        <small>
                          {money(it.price)} × {it.qty}
                        </small>
                      </div>

                      <span>{money(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>

                <footer>
                  <small>Delivering to</small>
                  <span>
                    {c.firstName} {c.lastName}, {c.street}, {c.city}
                    {c.province && `, ${c.province}`}, {c.zip}, {c.country}.{" "}
                    {c.phone}
                  </span>
                </footer>
              </article>
            );
          })
        )}
      </section>

      <Features />
    </>
  );
}