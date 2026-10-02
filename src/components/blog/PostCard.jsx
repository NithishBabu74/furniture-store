import { Link } from "react-router-dom";
import PostMeta from "./PostMeta";

export default function PostCard({ post }) {
  const link = `/blog/${post.id}`;
  return (
    <article className="mb-14">
      <Link to={link} className="block h-[240px] overflow-hidden rounded-[10px] bg-[#f9f1e7] sm:h-[360px]" aria-label={post.title}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </Link>
      <div className="mt-4"><PostMeta post={post} /></div>
      <h2 className="mt-3 text-left text-[26px] font-medium leading-tight text-black sm:text-[30px]">
        <Link to={link}>{post.title}</Link>
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#9f9f9f]">{post.body[0]}</p>
      <Link to={link} className="mt-8 inline-block border-b border-black pb-1 text-sm text-black">Read more</Link>
    </article>
  );
}
