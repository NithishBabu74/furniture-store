import { useNavigate } from "react-router-dom";

// Scrolls to a section; if it isn't on this page (e.g. on /shop), goes Home first.
export default function useGoTo() {
  const navigate = useNavigate();
  return (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate("/", { state: { scrollTo: id } });
  };
}
