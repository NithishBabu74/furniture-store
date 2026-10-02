export function LogoMark({ size = 40 }) {
  return (
    <svg className="logo-mark" viewBox="0 0 40 28" width={size} height={size * 0.7} fill="none" stroke="#b88e2f" strokeWidth="3.2" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 26 L14 3 L26 26" /><path d="M14 26 L26 8 L38 26" />
    </svg>
  );
}

export default function Logo() {
  return <span className="brand"><LogoMark /><span>Furniro</span></span>;
}
