import { Link, useNavigate } from "react-router-dom";
import Stars from "../common/Stars";
import { money } from "../../utils/money";
import { useStore } from "../../store/StoreContext";

export default function ProductCard({ p, showRating }) {
  const { addToCart, addCompare, toggleLike, liked, notify } = useStore();
  const navigate = useNavigate();
  const link = `/product/${p.id}`;
  const isLiked = liked.includes(p.id);
  const compareNow = () => { addCompare(p.id); navigate("/compare"); };

  const share = async () => {
    const url = `${window.location.origin}${link}`;
    try { await navigator.clipboard.writeText(url); notify("Product link copied"); }
    catch { notify(url); }
  };

  return (
    <article className="card">
      <div className="card-img">
        <Link to={link} aria-label={`View ${p.name}`}><img src={p.image} alt={p.name} loading="lazy" /></Link>
        {p.discount && <span className="badge sale">-{p.discount}%</span>}
        {!p.discount && p.isNew && <span className="badge new">New</span>}
        <div className="overlay">
          <button className="btn light" onClick={() => addToCart(p)}>Add to cart</button>
          <div className="actions">
            <button onClick={share}>Share</button>
            <button onClick={compareNow}>Compare</button>
            <button onClick={() => toggleLike(p.id)} aria-pressed={isLiked}>{isLiked ? "♥" : "♡"} Like</button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h3><Link to={link}>{p.name}</Link></h3>
        <p className="desc">{p.description}</p>
        {showRating && <p className="rate"><Stars value={p.rating} /> <small>{p.rating}</small></p>}
        <p className="price">
          {money(p.price)} {p.oldPrice && <s>{money(p.oldPrice)}</s>}
        </p>
      </div>
    </article>
  );
}
