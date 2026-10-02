import { FiCalendar, FiTag, FiUser } from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

// "Admin | 14 Oct 2022 | Wood" row shown under every post image.
export default function PostMeta({ post }) {
  const items = [
    { Icon: FiUser, text: post.author },
    { Icon: FiCalendar, text: formatDate(post.date) },
    { Icon: FiTag, text: post.category },
  ];
  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 gap-y-2 p-0 text-[13px] text-[#9f9f9f]">
      {items.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-2">
          <Icon aria-hidden="true" /> {text}
        </li>
      ))}
    </ul>
  );
}
