// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { BLOG_POSTS } from "../data/blogPosts";
// import PageBanner from "../components/layout/PageBanner";
// import Pagination from "../components/common/Pagination";
// import PostCard from "../components/blog/PostCard";
// import BlogSidebar from "../components/blog/BlogSidebar";
// import Features from "../components/layout/Features";

// const PER_PAGE = 3;

// export default function Blog() {
//   const [params, setParams] = useSearchParams();
//   const query = params.get("q") ?? "";
//   const category = params.get("category") ?? "";
//   const [page, setPage] = useState(1);

//   useEffect(() => window.scrollTo(0, 0), []);

//   // keeps ?q= and ?category= in the address bar so a filtered list can be shared
//   const update = (changes) => {
//     const next = new URLSearchParams(params);
//     Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
//     setParams(next, { replace: true });
//     setPage(1);
//   };

//   const filtered = useMemo(() => {
//     const q = query.toLowerCase();
//     return BLOG_POSTS.filter(
//       (p) =>
//         (!category || p.category === category) &&
//         (!q || `${p.title} ${p.category} ${p.body.join(" ")}`.toLowerCase().includes(q))
//     );
//   }, [query, category]);

//   const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
//   const current = Math.min(page, pages);
//   const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

//   const goToPage = (n) => {
//     setPage(n);
//     document.getElementById("blog-list")?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <PageBanner title="Blog" />

//       <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-[6vw] py-16 lg:flex-row lg:px-[4vw]">
//         <div id="blog-list" className="min-w-0 flex-1" style={{ scrollMarginTop: 90 }}>
//           {visible.map((p) => <PostCard key={p.id} post={p} />)}

//           {!visible.length && (
//             <p className="py-10 text-center text-[#898989]">
//               No posts match your search.{" "}
//               <button className="link" onClick={() => update({ q: "", category: "" })}>Clear filters</button>
//             </p>
//           )}

//           <Pagination page={current} pages={pages} onChange={goToPage} />
//         </div>

//         <BlogSidebar
//           query={query}
//           category={category}
//           liveSearch
//           onSearch={(q) => update({ q })}
//           onCategory={(c) => update({ category: c })}
//         />
//       </div>

//       <Features />
//     </>
//   );
// }





import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/blogPosts";
import PageBanner from "../components/layout/PageBanner";
import Pagination from "../components/common/Pagination";
import PostCard from "../components/blog/PostCard";
import BlogSidebar from "../components/blog/BlogSidebar";
import Features from "../components/layout/Features";

const PER_PAGE = 3;

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const [page, setPage] = useState(1);

  // Scroll to the top when the Blog page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keeps ?q= and ?category= in the address bar so a filtered list can be shared
  const update = (changes) => {
    const next = new URLSearchParams(params);

    Object.entries(changes).forEach(([k, v]) => {
      if (v) {
        next.set(k, v);
      } else {
        next.delete(k);
      }
    });

    setParams(next, { replace: true });
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return BLOG_POSTS.filter(
      (p) =>
        (!category || p.category === category) &&
        (!q ||
          `${p.title} ${p.category} ${p.body.join(" ")}`
            .toLowerCase()
            .includes(q))
    );
  }, [query, category]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);

  const visible = filtered.slice(
    (current - 1) * PER_PAGE,
    current * PER_PAGE
  );

  const goToPage = (n) => {
    setPage(n);

    document
      .getElementById("blog-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageBanner title="Blog" />

      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-[6vw] py-16 lg:flex-row lg:px-[4vw]">
        <div
          id="blog-list"
          className="min-w-0 flex-1"
          style={{ scrollMarginTop: 90 }}
        >
          {visible.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}

          {!visible.length && (
            <p className="py-10 text-center text-[#898989]">
              No posts match your search.{" "}
              <button
                className="link"
                onClick={() => update({ q: "", category: "" })}
              >
                Clear filters
              </button>
            </p>
          )}

          <Pagination
            page={current}
            pages={pages}
            onChange={goToPage}
          />
        </div>

        <BlogSidebar
          query={query}
          category={category}
          liveSearch
          onSearch={(q) => update({ q })}
          onCategory={(c) => update({ category: c })}
        />
      </div>

      <Features />
    </>
  );
}