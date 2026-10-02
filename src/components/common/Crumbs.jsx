import { Link } from "react-router-dom";

export default function Crumbs({ trail, current }) {
  return (
    <div className="crumbs">
      {trail.map((t) => <span key={t.label}><Link to={t.to}>{t.label}</Link> <i>›</i> </span>)}
      <span className="bar" /> <strong>{current}</strong>
    </div>
  );
}
