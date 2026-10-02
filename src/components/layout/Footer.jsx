import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import useGoTo from "../../utils/useGoTo";

export default function Footer() {
  const goTo = useGoTo();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer id="footer" className="footer">
      <div className="foot-grid">
        <div>
          <Link to="/" className="logo" aria-label="Furniro home"><Logo /></Link>
          <p className="muted">400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
        </div>
        <div>
          <h4>Links</h4>
          <a href="/" onClick={(e) => goTo(e, "home")}>Home</a>
          <Link to="/shop">Shop</Link>
          <a href="/#about" onClick={(e) => goTo(e, "about")}>About</a>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/contact">Payment Options</Link>
          <Link to="/contact">Returns</Link>
          <Link to="/contact">Privacy Policies</Link>
        </div>
        <div>
          <h4>Newsletter</h4>
          {done ? <p>Thanks for subscribing.</p> : (
            <div className="news">
              <input type="email" placeholder="Enter Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={() => email.includes("@") && setDone(true)}>SUBSCRIBE</button>
            </div>
          )}
        </div>
      </div>
      <p className="copy">© 2026 Furniro. All rights reserved</p>
    </footer>
  );
}
