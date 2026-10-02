// All data access lives here. Products (name, price, description, images, reviews...)
// come straight from the JSON API, so every card shows the right name with its own picture.
//
// To use YOUR dummy JSON API, put its URL(s) in API_URLS. Each URL may return either
// an array of products or { products: [...] } (the DummyJSON format).
// If your field names differ, only `mapProduct` below needs a small change.
const API_URLS = [
  "https://dummyjson.com/products/category/furniture?limit=0",
  "https://dummyjson.com/products/category/home-decoration?limit=0",
];

const prettify = (slug = "") =>
  String(slug).split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
const cm = (v) => (typeof v === "number" ? `${Math.round(v * 10) / 10} cm` : "N/A");

// DummyJSON product  ->  the shape the pages use
const mapProduct = (p) => {
  const price = Number(p.price) || 0;
  const pct = p.discountPercentage ? Math.round(p.discountPercentage) : 0;
  const images = (p.images?.length ? p.images : [p.thumbnail ?? p.image]).filter(Boolean);
  return {
    id: p.id,
    name: p.title ?? p.name,
    description: p.description ?? "",
    category: prettify(p.category ?? "other"),
    price,
    oldPrice: pct >= 1 ? Math.round((price / (1 - pct / 100)) * 100) / 100 : null,
    discount: pct >= 1 ? pct : null,
    isNew: Boolean(p.isNew),
    image: images[0],
    images,
    rating: Math.round((Number(p.rating) || 0) * 10) / 10,
    brand: p.brand,
    sku: p.sku,
    tags: p.tags ?? [],
    stock: p.stock,
    availability: p.availabilityStatus,
    dimensions: p.dimensions,
    weight: p.weight,
    warranty: p.warrantyInformation,
    shipping: p.shippingInformation,
    returnPolicy: p.returnPolicy,
    reviewList: (p.reviews ?? []).map((r) => ({ name: r.reviewerName, rating: r.rating, text: r.comment })),
  };
};

// Adds the extra text the detail and compare pages need, using only real API fields.
function enrich(p) {
  const d = p.dimensions ?? {};
  const aboutExtra = [p.shipping, p.warranty, p.returnPolicy].filter(Boolean).join(". ");
  return {
    ...p,
    sku: p.sku ?? `FR${String(p.id).padStart(4, "0")}`,
    tags: p.tags.length ? p.tags : [p.category],
    sizes: [],   // furniture from the API has no size variants
    colors: [],  // ...and no color variants
    reviews: p.reviewList.length,
    about: [p.description, aboutExtra ? `${aboutExtra}.` : null].filter(Boolean),
    info: {
      ...(p.brand ? { Brand: p.brand } : {}),
      Dimensions: `${cm(d.width)} W x ${cm(d.height)} H x ${cm(d.depth)} D`,
      Weight: p.weight ? `${p.weight} kg` : "N/A",
      Availability: p.availability ?? "N/A",
      Warranty: p.warranty ?? "N/A",
      Shipping: p.shipping ?? "N/A",
      Returns: p.returnPolicy ?? "N/A",
    },
    specs: [
      { title: "General", rows: [
        ["Brand", p.brand ?? "N/A"], ["SKU", p.sku ?? "N/A"], ["Category", p.category], ["Availability", p.availability ?? "N/A"], ["In Stock", p.stock ?? "N/A"],
      ] },
      { title: "Dimensions", rows: [
        ["Width", cm(d.width)], ["Height", cm(d.height)], ["Depth", cm(d.depth)], ["Weight", p.weight ? `${p.weight} kg` : "N/A"],
      ] },
      { title: "Warranty & Delivery", rows: [
        ["Warranty", p.warranty ?? "N/A"], ["Shipping", p.shipping ?? "N/A"], ["Return Policy", p.returnPolicy ?? "N/A"],
      ] },
    ],
  };
}

let cache = null; // products are fetched once and reused by every page
export function fetchProducts() {
  cache ??= (async () => {
    const lists = await Promise.all(API_URLS.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Could not load products");
      const data = await res.json();
      return data.products ?? data;
    }));
    const seen = new Set();
    return lists.flat().filter((p) => !seen.has(p.id) && seen.add(p.id)).map(mapProduct).map(enrich);
  })().catch((e) => { cache = null; throw e; });
  return cache;
}
