import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BLOG_POSTS, getPostById } from "../data/blogPosts";
import Crumbs from "../components/common/Crumbs";
import Features from "../components/layout/Features";
import PostMeta from "../components/blog/PostMeta";
import BlogSidebar from "../components/blog/BlogSidebar";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getPostById(id);

  useEffect(() => window.scrollTo(0, 0), [id]);

  if (!post) {
    return <section className="notice">This post does not exist. <Link to="/blog">Back to the blog</Link></section>;
  }

  const index = BLOG_POSTS.findIndex((p) => p.id === post.id);
  const prev = BLOG_POSTS[index + 1];
  const next = BLOG_POSTS[index - 1];
  const toList = (key) => (value) => navigate(value ? `/blog?${key}=${encodeURIComponent(value)}` : "/blog");

  return (
    <>
      <Crumbs trail={[{ to: "/", label: "Home" }, { to: "/blog", label: "Blog" }]} current={post.title} />

      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-[6vw] py-16 lg:flex-row lg:px-[4vw]">
        <article className="min-w-0 flex-1">
          <div className="h-[240px] overflow-hidden rounded-[10px] bg-[#f9f1e7] sm:h-[420px]">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="mt-4"><PostMeta post={post} /></div>
          <h1 className="mt-3 text-[28px] font-medium leading-tight text-black sm:text-[36px]">{post.title}</h1>
          <div className="mt-6 flex flex-col gap-5 text-[15px] leading-7 text-[#6b6b6b]">
            {post.body.map((para) => <p key={para}>{para}</p>)}
          </div>

          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[#e8e8e8] pt-6 text-sm">
            {prev ? <Link to={`/blog/${prev.id}`} className="text-[#b88e2f]">‹ {prev.title}</Link> : <span />}
            {next ? <Link to={`/blog/${next.id}`} className="text-[#b88e2f]">{next.title} ›</Link> : <span />}
          </div>
        </article>

        <BlogSidebar
          query=""
          category=""
          onSearch={toList("q")}
          onCategory={toList("category")}
        />
      </div>

      <Features />
    </>
  );
}
