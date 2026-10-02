export default function Qty({ value, onChange, compact }) {
  return (
    <div className={`qty ${compact ? "compact" : ""}`}>
      <button onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity" disabled={value <= 1}>-</button>
      <span aria-live="polite">{value}</span>
      <button onClick={() => onChange(Math.min(99, value + 1))} aria-label="Increase quantity">+</button>
    </div>
  );
}
