import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function RecentPosts({ posts }) {
  return (
    <div className="mt-10 px-4">
      <h3 className="text-2xl font-medium text-black">Recent Posts</h3>
      <ul className="m-0 mt-6 flex list-none flex-col gap-5 p-0">
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`} className="flex items-center gap-3">
              <div className="h-[64px] w-[80px] flex-none overflow-hidden rounded-[10px] bg-[#f9f1e7]">
                <img src={p.image} alt="" loading="lazy" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm leading-tight text-black">{p.title}</span>
                <small className="text-xs text-[#9f9f9f]">{formatDate(p.date)}</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
