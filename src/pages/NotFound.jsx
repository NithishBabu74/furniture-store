import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <section className="notice">
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="btn small" to="/">Back to home</Link>
    </section>
  );
}
