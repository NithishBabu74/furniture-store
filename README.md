# Furniro landing page (React + Vite)

    npm install
    npm run dev

- `src/App.jsx`  – routes + Home sections
- `src/pages/Shop.jsx` – shop page (filter, show, sort by, pagination)
- `src/components/Layout.jsx` – Navbar, Footer, ProductCard
- `src/App.css`  – styles
- `src/api.js`   – data layer; set `API_URL` and edit `mapProduct` to use your JSON API

- `src/pages/ProductDetail.jsx` – product page (gallery, size/color/qty, share, tabs, related products)
- `src/pages/Cart.jsx`, `src/pages/Compare.jsx` – full cart and compare pages
- `src/context/StoreContext.jsx` – cart, compare and likes (saved in localStorage)
- `src/components/CartDrawer.jsx` – cart side panel and toast messages
- `src/pages/Checkout.jsx` – checkout form, order summary and Place order
- `src/pages/Orders.jsx` – My Orders page (the 👤 icon in the navbar); orders are saved in localStorage
- `src/pages/Contact.jsx` – Contact page; `src/config.js` – set FORMSPREE_ID or CONTACT_EMAIL so messages reach your inbox

- `src/pages/Blog.jsx` – Blog list (search, category filter, pagination); `src/pages/BlogPost.jsx` – single post
- `src/data/blogPosts.js` – blog content (edit or add posts here)
- `src/components/blog/` – PostCard, PostMeta, SearchBox, CategoryList, RecentPosts, BlogSidebar
- `src/components/PageBanner.jsx`, `src/components/Pagination.jsx` – reusable banner and pager
- Styling: Tailwind CSS (utilities only, `src/tailwind.css`) for new components + `App.css`; icons from React Icons. Run `npm install` again after pulling this update.

## Update notes
- Navbar: Home, Shop, About, Contact + icons (account/orders, search, wishlist heart, cart). Blog is reached from the home page "Explore More" button.
- Products come from the JSON API: set `API_URLS` at the top of `src/api.js` (default DummyJSON furniture + home-decoration). Prices are in USD.
- Artwork (hero, banners, rooms, blog) is generated vector art in `public/images`; regenerate with `node scripts-gen-art.mjs`.
- New: `/wishlist` page, navbar search (`/shop?q=...`), 404 page.
