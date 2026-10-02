// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import BannerLogo from "../components/common/BannerLogo";
// import Features from "../components/layout/Features";
// import { CONTACT_EMAIL, FORMSPREE_ID } from "../services/config";

// const EMPTY = { name: "", email: "", subject: "", message: "", website: "" }; // "website" is a hidden spam trap

// const validate = (v) => {
//   const e = {};
//   if (!v.name.trim()) e.name = "Enter your name.";
//   if (!v.email.trim()) e.email = "Enter your email address.";
//   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
//   if (!v.subject.trim()) e.subject = "Enter a subject.";
//   if (!v.message.trim()) e.message = "Enter your message.";
//   return e;
// };

// const Pin = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>;
// const Phone = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z" /></svg>;
// const Clock = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 13.4-5.2-3.1V6h1.5v5.5l4.5 2.6-.8 1.3Z" /></svg>;

// export default function Contact() {
//   const [values, setValues] = useState(EMPTY);
//   const [errors, setErrors] = useState({});
//   const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | sending | sent | error

//   useEffect(() => window.scrollTo(0, 0), []);

//   const set = (key) => (e) => {
//     setValues((v) => ({ ...v, [key]: e.target.value }));
//     if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     const found = validate(values);
//     setErrors(found);
//     if (Object.keys(found).length) {
//       document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
//       return;
//     }
//     if (values.website) return; // a bot filled the hidden field

//     const data = { name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim(), message: values.message.trim() };

//     if (FORMSPREE_ID) {
//       setStatus({ state: "sending", message: "" });
//       try {
//         const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", Accept: "application/json" },
//           body: JSON.stringify(data),
//         });
//         if (!res.ok) throw new Error("Request failed");
//         setStatus({ state: "sent", message: "Thank you. Your message has been sent and we will reply by email soon." });
//         setValues(EMPTY);
//       } catch {
//         setStatus({ state: "error", message: "Your message could not be sent. Check your connection and try again." });
//       }
//     } else if (CONTACT_EMAIL) {
//       const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
//       window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
//       setStatus({ state: "sent", message: "Your email app should open with the message ready. Press Send there to finish." });
//     } else {
//       setStatus({ state: "error", message: "The contact form is not connected to an email address yet. Set FORMSPREE_ID or CONTACT_EMAIL in src/config.js." });
//     }
//   };

//   const field = (name, label, input) => (
//     <div className="ct-field">
//       <label htmlFor={`ct-${name}`}>{label}</label>
//       {input}
//       {errors[name] && <p className="ct-error" id={`ct-${name}-err`} role="alert">{errors[name]}</p>}
//     </div>
//   );
//   const common = (name) => ({ id: `ct-${name}`, name, value: values[name], onChange: set(name), "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `ct-${name}-err` : undefined });

//   return (
//     <>
//       <section className="shop-banner">
//         <BannerLogo />
//         <h1>Contact</h1>
//         <p><Link to="/"><b>Home</b></Link> › Contact</p>
//       </section>

//       <section className="contact">
//         <h2>Get In Touch With Us</h2>
//         <p className="sub">For More Information About Our Product &amp; Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>

//         <div className="ct-grid">
//           <div className="ct-info">
//             <div><Pin /><div><h3>Address</h3><p>236 5th SE Avenue, New York NY10000, United States</p></div></div>
//             <div><Phone /><div><h3>Phone</h3><p>Mobile: +(84) 546-6789<br />Hotline: +(84) 456-6789</p></div></div>
//             <div><Clock /><div><h3>Working Time</h3><p>Monday-Friday: 9:00 - 22:00<br />Saturday-Sunday: 9:00 - 21:00</p></div></div>
//           </div>

//           <form className="ct-form" onSubmit={submit} noValidate>
//             {field("name", "Your name", <input {...common("name")} type="text" placeholder="Abc" autoComplete="name" />)}
//             {field("email", "Email address", <input {...common("email")} type="email" placeholder="Abc@def.com" autoComplete="email" />)}
//             {field("subject", "Subject", <input {...common("subject")} type="text" placeholder="What is this about?" />)}
//             {field("message", "Message", <textarea {...common("message")} rows={4} placeholder="Hi! I'd like to ask about" />)}
//             <input className="ct-trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={values.website} onChange={set("website")} />
//             <button className="btn ct-submit" type="submit" disabled={status.state === "sending"}>
//               {status.state === "sending" ? "Sending…" : "Submit"}
//             </button>
//             {status.message && <p className={`ct-status ${status.state}`} role="status">{status.message}</p>}
//           </form>
//         </div>
//       </section>

//       <Features />
//     </>
//   );
// }




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerLogo from "../components/common/BannerLogo";
import Features from "../components/layout/Features";
import { CONTACT_EMAIL, FORMSPREE_ID } from "../services/config";

const EMPTY = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const validate = (v) => {
  const e = {};

  if (!v.name.trim()) {
    e.name = "Enter your name.";
  }

  if (!v.email.trim()) {
    e.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
    e.email = "Enter a valid email address, like name@example.com.";
  }

  if (!v.subject.trim()) {
    e.subject = "Enter a subject.";
  }

  if (!v.message.trim()) {
    e.message = "Enter your message.";
  }

  return e;
};

const Pin = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
  </svg>
);

const Phone = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z" />
  </svg>
);

const Clock = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 13.4-5.2-3.1V6h1.5v5.5l4.5 2.6-.8 1.3Z" />
  </svg>
);

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const set = (key) => (e) => {
    setValues((v) => ({
      ...v,
      [key]: e.target.value,
    }));

    if (errors[key]) {
      setErrors((er) => ({
        ...er,
        [key]: undefined,
      }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length) {
      document
        .querySelector(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }

    if (values.website) return;

    const data = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    if (FORMSPREE_ID) {
      setStatus({
        state: "sending",
        message: "",
      });

      try {
        const res = await fetch(
          `https://formspree.io/f/${FORMSPREE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!res.ok) {
          throw new Error("Request failed");
        }

        setStatus({
          state: "sent",
          message:
            "Thank you. Your message has been sent and we will reply by email soon.",
        });

        setValues(EMPTY);
      } catch {
        setStatus({
          state: "error",
          message:
            "Your message could not be sent. Check your connection and try again.",
        });
      }
    } else if (CONTACT_EMAIL) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        data.subject
      )}&body=${encodeURIComponent(body)}`;

      setStatus({
        state: "sent",
        message:
          "Your email app should open with the message ready. Press Send there to finish.",
      });
    } else {
      setStatus({
        state: "error",
        message:
          "The contact form is not connected to an email address yet. Set FORMSPREE_ID or CONTACT_EMAIL in src/config.js.",
      });
    }
  };

  const field = (name, label, input) => (
    <div className="ct-field">
      <label htmlFor={`ct-${name}`}>{label}</label>
      {input}

      {errors[name] && (
        <p
          className="ct-error"
          id={`ct-${name}-err`}
          role="alert"
        >
          {errors[name]}
        </p>
      )}
    </div>
  );

  const common = (name) => ({
    id: `ct-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name]
      ? `ct-${name}-err`
      : undefined,
  });

  return (
    <>
      <section className="shop-banner">
        <BannerLogo />
        <h1>Contact</h1>
        <p>
          <Link to="/">
            <b>Home</b>
          </Link>{" "}
          › Contact
        </p>
      </section>

      <section className="contact">
        <h2>Get In Touch With Us</h2>

        <p className="sub">
          For More Information About Our Product &amp; Services.
          Please Feel Free To Drop Us An Email. Our Staff Always
          Be There To Help You Out. Do Not Hesitate!
        </p>

        <div className="ct-grid">
          <div className="ct-info">
            <div>
              <Pin />
              <div>
                <h3>Address</h3>
                <p>
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            <div>
              <Phone />
              <div>
                <h3>Phone</h3>
                <p>
                  Mobile: +(84) 546-6789
                  <br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <div>
              <Clock />
              <div>
                <h3>Working Time</h3>
                <p>
                  Monday-Friday: 9:00 - 22:00
                  <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          <form
            className="ct-form"
            onSubmit={submit}
            noValidate
          >
            {field(
              "name",
              "Your name",
              <input
                {...common("name")}
                type="text"
                placeholder="Abc"
                autoComplete="name"
              />
            )}

            {field(
              "email",
              "Email address",
              <input
                {...common("email")}
                type="email"
                placeholder="Abc@def.com"
                autoComplete="email"
              />
            )}

            {field(
              "subject",
              "Subject",
              <input
                {...common("subject")}
                type="text"
                placeholder="What is this about?"
              />
            )}

            {field(
              "message",
              "Message",
              <textarea
                {...common("message")}
                rows={4}
                placeholder="Hi! I'd like to ask about"
              />
            )}

            <input
              className="ct-trap"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={values.website}
              onChange={set("website")}
            />

            <button
              className="btn ct-submit"
              type="submit"
              disabled={status.state === "sending"}
            >
              {status.state === "sending"
                ? "Sending…"
                : "Submit"}
            </button>

            {status.message && (
              <p
                className={`ct-status ${status.state}`}
                role="status"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Features />
    </>
  );
}