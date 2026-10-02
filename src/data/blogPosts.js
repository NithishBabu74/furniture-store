// Blog content for the Furniro journal. Newest first.
// `body` is an array of paragraphs; the first one is also used as the card excerpt.

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Going all-in with millennial design",
    author: "Admin",
    date: "2026-09-14",
    category: "Design",
    image: "/images/blog-1.svg",
    body: [
      "Millennial design is less a strict style than a set of habits: soft neutral walls, one confident color, and furniture that looks good without demanding attention. Rooms are built around how people actually live, so a sofa has to work for movie nights and for a laptop on a Tuesday afternoon.",
      "The easiest way to start is with a single anchor piece. A deep, low sofa such as our Lolito gives a living room its shape, and everything else can stay quiet around it. Keep the rug plain, let the curtains be linen, and save your bold choice for one cushion cover or one wall.",
      "Lighting does the rest. Warm lamps at three different heights make a room feel finished far more than a single ceiling light ever will. Place a floor lamp like Grifo beside the sofa, add a small table lamp near the shelves, and dim everything in the evening.",
      "Finally, leave some space empty. Part of the look is breathing room, and a room with a clear floor and a few well-chosen objects always reads as calmer than one filled to the edges.",
    ],
  },
  {
    id: 2,
    title: "Exploring new ways of decorating",
    author: "Admin",
    date: "2026-08-29",
    category: "Interior",
    image: "/images/blog-2.svg",
    body: [
      "Decorating does not have to start with a full shopping list. Many of the best rooms begin with a single question: what do you want to see when you walk in? A reading chair by the window, a long shelf of books, or an uncluttered dining table all make good answers.",
      "Try grouping objects in odd numbers. Three items of different heights, such as a small flower pot, a ceramic mug and a stack of books, look natural together, while pairs can feel stiff. Our Potty flower pot and Muggo mug are good starting points for a shelf like this.",
      "Mix textures before you mix colors. A rattan seat, a cotton throw and a matte ceramic bowl can share a palette of whites and beiges and still feel rich because each surface catches the light differently.",
      "Last, move things around. Swap the lamp and the plant, turn a chair to face a different wall, and live with it for a week. Good decorating is mostly small experiments, and the cheapest ones are free.",
    ],
  },
  {
    id: 3,
    title: "Handmade pieces that took time to make",
    author: "Admin",
    date: "2026-08-17",
    category: "Handmade",
    image: "/images/blog-3.svg",
    body: [
      "A handmade piece carries the marks of the person who made it. The glaze on a ceramic mug pools slightly differently each time, and a woven seat has a rhythm that no machine copies exactly. These small differences are what make a piece feel personal.",
      "Time is the real ingredient. Clay needs days to dry before its first firing, wood needs months of seasoning, and a rattan seat can take an afternoon to weave by hand. Pieces made this way cost more, but they are usually repaired rather than replaced.",
      "When you buy handmade, look at the details you cannot see from across the room: the inside of a drawer, the underside of a table, the joints where two pieces of wood meet. Clean, patient work in those places is a reliable sign of quality.",
    ],
  },
  {
    id: 4,
    title: "Modern home in Milan",
    author: "Admin",
    date: "2026-07-30",
    category: "Interior",
    image: "/images/blog-4.svg",
    body: [
      "Milan apartments are known for tall windows, patterned stone floors and a quiet confidence in how little they need. A recent renovation we followed kept the old terrazzo and plaster walls and changed almost everything else, with simple furniture and a lot of daylight.",
      "The living room has just a few elements: a long low sofa, one round side table and a single lamp that arcs over the seating. Because the floor and walls are already full of character, the furniture stays plain on purpose.",
      "In the bedroom the owners chose a low wooden bed with a thin cotton mattress cover, much like our Pingky set. Storage is hidden in built-in cupboards so the room never looks busy, which helps it feel larger than it is.",
      "The lesson is easy to borrow even in a small flat: keep the surfaces calm, let natural light in, and buy fewer, better things.",
    ],
  },
  {
    id: 5,
    title: "Colorful office redesign",
    author: "Admin",
    date: "2026-07-12",
    category: "Design",
    image: "/images/blog-5.svg",
    body: [
      "A home office does not need to be grey. Studies of workspaces often point out that color affects mood and energy, and many people find a warm or green-toned corner easier to sit in for hours than a plain white one.",
      "Start with the wall behind your screen, because that is what you see during video calls and what your eyes rest on between tasks. A muted terracotta or sage works well and is easy to live with. Then bring the same color back in a chair cushion or a pot plant.",
      "Keep the desk itself simple. A clear surface, one lamp and a small tray for pens are enough. A comfortable chair such as our Syltherine cafe chair also works at a desk if you add a firm cushion.",
      "Finish with something personal within sight, like a favorite mug or a framed print. It sounds minor, but people who like their workspace tend to spend their working hours there more happily.",
    ],
  },
  {
    id: 6,
    title: "Why solid wood still wins",
    author: "Admin",
    date: "2026-06-25",
    category: "Wood",
    image: "/images/blog-6.svg",
    body: [
      "Solid wood is heavy, honest and long-lasting. Unlike thin veneers over board, a solid tabletop can be sanded and refinished many times, so a scratch or a ring from a hot cup is never the end of the story.",
      "Different woods suit different jobs. Teak resists moisture, which is why it is used for outdoor chairs and kitchen furniture. Oak is hard and stable for dining tables, while lighter woods like ash bring brightness to small rooms.",
      "To look after it, wipe spills quickly, keep it away from direct radiators, and apply a little natural oil once or twice a year. Wood that is cared for improves with age and picks up a soft shine you cannot buy new.",
    ],
  },
  {
    id: 7,
    title: "Small crafts, big character: styling with ceramics",
    author: "Admin",
    date: "2026-06-08",
    category: "Crafts",
    image: "/images/blog-7.svg",
    body: [
      "Ceramics are the easiest way to add personality to a room because they are small, affordable and endlessly rearrangeable. A single vase on a windowsill or a row of mugs on an open shelf can change the feel of a whole corner.",
      "Think in families rather than sets. Pieces that share a glaze color or a similar shape look connected even when they are different sizes. A small mug like Muggo beside a short flower pot makes a pairing that looks collected rather than bought in one go.",
      "Use them, too. A bowl that holds keys by the door or a pot that holds kitchen spoons earns its place twice, once for its looks and once for its job.",
    ],
  },
];

export const getPostById = (id) => BLOG_POSTS.find((p) => String(p.id) === String(id));

// [{ name: "Design", count: 2 }, ...] built from the posts, so counts are always correct
export const getCategories = () => {
  const counts = {};
  BLOG_POSTS.forEach((p) => { counts[p.category] = (counts[p.category] ?? 0) + 1; });
  return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name));
};
