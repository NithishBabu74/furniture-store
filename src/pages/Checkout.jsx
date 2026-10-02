
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Features from "../components/layout/Features";
import { money } from "../utils/money";
import PageBanner from "../components/layout/PageBanner";
import { useStore } from "../store/StoreContext";

const COUNTRIES = [
  "Sri Lanka",
  "India",
  "Indonesia",
  "Malaysia",
  "Singapore",
  "Australia",
  "United Kingdom",
  "United States",
];

const PROVINCES = {
  "Sri Lanka": [
    "Western Province",
    "Central Province",
    "Southern Province",
    "Northern Province",
    "Eastern Province",
    "North Western Province",
    "North Central Province",
    "Uva Province",
    "Sabaragamuwa Province",
  ],
};

const PAYMENTS = {
  "Direct Bank Transfer":
    "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  "Cash On Delivery": "Pay with cash when your order is delivered.",
};

const EMPTY = {
  firstName: "",
  lastName: "",
  company: "",
  country: "Sri Lanka",
  street: "",
  city: "",
  province: "Western Province",
  zip: "",
  phone: "",
  email: "",
  notes: "",
  payment: "Direct Bank Transfer",
};

function Field({ label, children }) {
  return (
    <label className="co-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function Checkout() {
  const { cart, subtotal, placeOrder } = useStore();

  const [form, setForm] = useState(EMPTY);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.value,
    }));

  const setCountry = (e) => {
    const country = e.target.value;

    setForm((f) => ({
      ...f,
      country,
      province: PROVINCES[country]?.[0] ?? "",
    }));
  };

  const provinces = PROVINCES[form.country];

  const submit = (e) => {
    e.preventDefault();

    if (!cart.length) return;

    setOrder(placeOrder(form));
    window.scrollTo(0, 0);
  };

  const scrollToFooter = (e) => {
    e.preventDefault();

    document
      .getElementById("footer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  let body;

  if (order) {
    const c = order.customer;

    body = (
      <section className="co-done">
        <h2>Thank you, {c.firstName}. Your order is placed.</h2>

        <p>
          Order number <strong>{order.id}</strong>. We will contact you at{" "}
          {c.email} about delivery to {c.street}, {c.city},{" "}
          {c.province && `${c.province}, `}
          {c.country}.
        </p>

        <ul className="co-lines">
          {order.items.map((it) => (
            <li key={it.key}>
              <span>
                {it.name} × {it.qty}
              </span>
              <span>{money(it.price * it.qty)}</span>
            </li>
          ))}

          <li className="co-total">
            <span>Total ({c.payment})</span>
            <strong>{money(order.total)}</strong>
          </li>
        </ul>

        <div className="co-done-links">
          <Link className="btn small" to="/orders">
            View my orders
          </Link>

          <Link className="underline" to="/shop">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  } else if (cart.length === 0) {
    body = (
      <section className="notice">
        <p>Your cart is empty, so there is nothing to check out.</p>

        <Link className="btn small" to="/shop">
          Return to shop
        </Link>
      </section>
    );
  } else {
    body = (
      <form className="co checkout-layout" onSubmit={submit}>
        {/* Billing details */}
        <div className="co-billing">
          <h2>Billing details</h2>

          <div className="co-two">
            <Field label="First Name">
              <input
                required
                value={form.firstName}
                onChange={set("firstName")}
                autoComplete="given-name"
              />
            </Field>

            <Field label="Last Name">
              <input
                required
                value={form.lastName}
                onChange={set("lastName")}
                autoComplete="family-name"
              />
            </Field>
          </div>

          <Field label="Company Name (Optional)">
            <input
              value={form.company}
              onChange={set("company")}
              autoComplete="organization"
            />
          </Field>

          <Field label="Country / Region">
            <select value={form.country} onChange={setCountry}>
              {COUNTRIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Street address">
            <input
              required
              value={form.street}
              onChange={set("street")}
              autoComplete="street-address"
            />
          </Field>

          <Field label="Town / City">
            <input
              required
              value={form.city}
              onChange={set("city")}
              autoComplete="address-level2"
            />
          </Field>

          <Field label={provinces ? "Province" : "State / Province"}>
            {provinces ? (
              <select
                value={form.province}
                onChange={set("province")}
              >
                {provinces.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            ) : (
              <input
                required
                value={form.province}
                onChange={set("province")}
                autoComplete="address-level1"
              />
            )}
          </Field>

          <Field label="ZIP code">
            <input
              required
              value={form.zip}
              onChange={set("zip")}
              autoComplete="postal-code"
            />
          </Field>

          <Field label="Phone">
            <input
              required
              type="tel"
              pattern="[0-9+\s\-]{7,}"
              title="Enter a valid phone number"
              value={form.phone}
              onChange={set("phone")}
              autoComplete="tel"
            />
          </Field>

          <Field label="Email address">
            <input
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </Field>

          <textarea
            className="co-notes"
            placeholder="Additional information"
            value={form.notes}
            onChange={set("notes")}
            rows={2}
            aria-label="Additional information"
          />
        </div>

        {/* Order summary */}
        <aside className="co-order cart-total">
          <h2>Your Order</h2>

          <div className="co-head">
            <h3>Product</h3>
            <h3>Subtotal</h3>
          </div>

          <ul className="co-lines">
            {cart.map((it) => (
              <li key={it.key}>
                <span>
                  {it.name} <b>× {it.qty}</b>

                  {(it.size || it.color) && (
                    <small>
                      {[it.size, it.color]
                        .filter(Boolean)
                        .join(" / ")}
                    </small>
                  )}
                </span>

                <span>{money(it.price * it.qty)}</span>
              </li>
            ))}

            <li>
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </li>

            <li className="co-total">
              <span>Total</span>
              <strong>{money(subtotal)}</strong>
            </li>
          </ul>

          {/* Payment methods */}
          <fieldset className="co-pay">
            <legend className="sr-only">Payment method</legend>

            {Object.entries(PAYMENTS).map(([name, text]) => (
              <div key={name}>
                <label className="co-radio">
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === name}
                    onChange={() =>
                      setForm((f) => ({
                        ...f,
                        payment: name,
                      }))
                    }
                  />

                  {name}
                </label>

                {form.payment === name && (
                  <p className="co-pay-text">{text}</p>
                )}
              </div>
            ))}
          </fieldset>

          {/* Privacy policy */}
          <p className="co-privacy">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account,
            and for other purposes described in our{" "}
            <a href="#footer" onClick={scrollToFooter}>
              <b>privacy policy.</b>
            </a>
          </p>

          <button className="pill co-place" type="submit">
            Place order
          </button>
        </aside>
      </form>
    );
  }

  return (
    <>
      <PageBanner title="Checkout" />

      {body}

      <Features />
    </>
  );
}