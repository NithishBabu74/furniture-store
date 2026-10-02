import { Link } from "react-router-dom";
import { useStore } from "../../store/StoreContext";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="toast" role="status" key={toast.id}>
      {toast.message}
      {toast.link && <Link to={toast.link.to}>{toast.link.label}</Link>}
    </div>
  );
}
