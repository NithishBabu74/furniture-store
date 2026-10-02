export default function Stars({ value }) {
  return <span className="stars" style={{ "--pct": `${(value / 5) * 100}%` }} role="img" aria-label={`${value} out of 5 stars`}>★★★★★</span>;
}
