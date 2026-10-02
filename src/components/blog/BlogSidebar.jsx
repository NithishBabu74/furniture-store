import { BLOG_POSTS, getCategories } from "../../data/blogPosts";
import CategoryList from "./CategoryList";
import RecentPosts from "./RecentPosts";
import SearchBox from "./SearchBox";

const RECENT_COUNT = 5;

export default function BlogSidebar({ query, category, onSearch, onCategory, liveSearch }) {
  const recent = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, RECENT_COUNT);
  return (
    <aside className="w-full flex-none lg:w-[320px]">
      <SearchBox initial={query} onSearch={onSearch} live={liveSearch} />
      <CategoryList categories={getCategories()} active={category} onSelect={onCategory} />
      <RecentPosts posts={recent} />
    </aside>
  );
}
