import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "../services/api";
import Crumbs from "../components/common/Crumbs";
import ProductCard from "../components/product/ProductCard";
import Qty from "../components/common/Qty";
import Stars from "../components/common/Stars";
import { money } from "../utils/money";
import { useStore } from "../store/StoreContext";

const FIRST_RELATED = 4;
const RELATED_STEP = 10;

export default function ProductDetail() {
  const { id } = useParams();
  const [all, setAll] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    fetchProducts()
      .then((data) => {
        if (active) {
          setAll(data);
        }
      })
      .catch(() => {
        if (active) {
          setFailed(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (failed) {
    return (
      <section className="notice">
        Product could not be loaded. Refresh to try again.
      </section>
    );
  }

  if (!all) {
    return (
      <section className="notice">
        Loading product…
      </section>
    );
  }

  const product = all.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <section className="notice">
        This product does not exist.{" "}
        <Link to="/shop">Back to the shop</Link>
      </section>
    );
  }

  return <Detail key={product.id} product={product} all={all} />;
}

function Detail({ product: p, all }) {
  const { addToCart, addCompare } = useStore();
  const navigate = useNavigate();

  const [img, setImg] = useState(0);
  const [size, setSize] = useState(p.sizes[0] ?? null);
  const [color, setColor] = useState(p.colors[0] ?? null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [shown, setShown] = useState(FIRST_RELATED);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset the image error state when the selected image changes.
  useEffect(() => {
    setImageFailed(false);
  }, [img]);

  // Same-category products first, then best rated.
  const related = useMemo(
    () =>
      all
        .filter((x) => x.id !== p.id)
        .sort(
          (a, b) =>
            (b.category === p.category) - (a.category === p.category) ||
            b.rating - a.rating
        ),
    [all, p]
  );

  const url = window.location.href;
  const enc = encodeURIComponent;

  const share = [
    {
      name: "Facebook",
      mark: "f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      name: "LinkedIn",
      mark: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      name: "Twitter",
      mark: "t",
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(p.name)}`,
    },
  ];

  const images = p.images?.length ? p.images : [p.image].filter(Boolean);
  const selectedImage = images[img] ?? images[0];

  const lowerImages = [
    images[1] ?? images[0],
    images[2] ?? images[0],
  ].filter(Boolean);

  const tabs = [
    ["description", "Description"],
    ["info", "Additional Information"],
    ["reviews", `Reviews [${p.reviews}]`],
  ];

  return (
    <>
      <Crumbs
        trail={[
          { to: "/", label: "Home" },
          { to: "/shop", label: "Shop" },
        ]}
        current={p.name}
      />

      <section className="detail">
        <div className="gallery">
          <div className="thumbs">
            {images.slice(0, 4).map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                className={i === img ? "on" : ""}
                onClick={() => setImg(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === img}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>

          <div className="main-img">
            {selectedImage && !imageFailed ? (
              <img
                key={selectedImage}
                src={selectedImage}
                alt={p.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="image-fallback" role="status">
                Image unavailable
              </div>
            )}
          </div>
        </div>

        <div className="info">
          <h1>{p.name}</h1>

          <p className="d-price">
            {money(p.price)} {p.oldPrice && <s>{money(p.oldPrice)}</s>}
          </p>

          <p className="rating-row">
            <Stars value={p.rating} /> <span className="vbar" />{" "}
            <small>{p.reviews} Customer Review</small>
          </p>

          <p className="short">{p.description}</p>

          {p.sizes.length > 0 && (
            <div className="opt">
              <small>Size</small>
              <div className="sizes">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={s === size ? "on" : ""}
                    onClick={() => setSize(s)}
                    aria-pressed={s === size}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {p.colors.length > 0 && color && (
            <div className="opt">
              <small>Color: {color.name}</small>
              <div className="colors">
                {p.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={c.name === color.name ? "on" : ""}
                    style={{ background: c.hex }}
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                    aria-pressed={c.name === color.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="buy">
            <Qty value={qty} onChange={setQty} />

            <button
              className="pill"
              onClick={() =>
                addToCart(p, {
                  qty,
                  size,
                  color: color?.name ?? null,
                })
              }
            >
              Add To Cart
            </button>

            <button
              className="pill"
              onClick={() => {
                addCompare(p.id);
                navigate("/compare");
              }}
            >
              + Compare
            </button>
          </div>

          <dl className="meta">
            <dt>SKU</dt>
            <dd>{p.sku}</dd>

            <dt>Category</dt>
            <dd>{p.category}</dd>

            <dt>Tags</dt>
            <dd>{p.tags.join(", ")}</dd>

            <dt>Share</dt>
            <dd className="share-links">
              {share.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${s.name}`}
                >
                  {s.mark}
                </a>
              ))}
            </dd>
          </dl>
        </div>
      </section>

      <section className="tabs-wrap">
        <div className="tabs" role="tablist">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={tab === key ? "on" : ""}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "description" && (
          <div className="tab-body">
            {p.about.map((t) => (
              <p key={t}>{t}</p>
            ))}

            <div className="wide-imgs">
              {lowerImages.map((src, i) => (
                <div key={`${src}-${i}`}>
                  <img
                    src={src}
                    alt={`${p.name} view ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "info" && (
          <div className="tab-body">
            <dl className="spec">
              {Object.entries(p.info).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {tab === "reviews" && (
          <div className="tab-body">
            <p>
              <Stars value={p.rating} /> <strong>{p.rating}</strong> from{" "}
              {p.reviews} reviews.
            </p>

            <ul className="reviews">
              {p.reviewList.map((r) => (
                <li key={`${r.name}-${r.text}`}>
                  <strong>{r.name}</strong> <Stars value={r.rating} />
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="products related">
        <h2>Related Products</h2>

        <div className="grid">
          {related.slice(0, shown).map((x) => (
            <ProductCard key={x.id} p={x} showRating />
          ))}
        </div>

        {shown < related.length && (
          <button
            className="btn outline"
            onClick={() => setShown((n) => n + RELATED_STEP)}
          >
            Show More
          </button>
        )}
      </section>
    </>
  );
}