import Link from "next/link";

import { textToSlug } from "../lib/textToSlug";
import * as css from "./PostCell.css";

import type { PostMetadata } from "../lib";

const MONTH = {
  "01": "January",
  "02": "Februay",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

type Month = typeof MONTH extends Record<infer U, string> ? U : never;

export function PostCell({ post }: { post: PostMetadata }) {
  const { title, description, date, tags } = post;
  const [year, month, day] = new Date(date).toISOString().split("-") as [
    string,
    Month,
    string
  ];
  const isInvalidPostDate = new Date(date).toString() === "Invalid Date";

  return (
    <div className={css.layout}>
      <div className={css.infoLayout}>
        <span className={css.postDate}>
          {isInvalidPostDate
            ? ""
            : `${day.slice(0, 2)} ${MONTH[month]} ${year}`}
        </span>
        <ul className={css.tagList}>
          {tags.map((tag) => (
            <li key={tag} className={css.tagLabel}>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Link href={`/${textToSlug(title)}`} className={css.postTitle}>
          {title}
        </Link>
      </div>

      <div className={css.bodyLayout}>
        <div className={css.description}>{description}</div>
      </div>
    </div>
  );
}
