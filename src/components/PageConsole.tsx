import { useRouter } from "next/router";

import * as css from "./PageConsole.css";
import Link from "next/link";

export function PageConsole({
  hasPrevPage = false,
  hasNextPage = false,
}: {
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
}) {
  const {
    query: { pageIndex = "1" },
  } = useRouter();

  return (
    <div className={css.pageConsole}>
      {hasPrevPage ? (
        <Link
          href={`/pages/${Number(pageIndex) - 1}`}
          className={css.pageButton}
        >
          &larr; Previous
        </Link>
      ) : (
        "ㅤ"
      )}
      {hasNextPage ? (
        <Link
          href={`/pages/${Number(pageIndex) + 1}`}
          className={css.pageButton}
        >
          Next &rarr;
        </Link>
      ) : (
        "ㅤ"
      )}
    </div>
  );
}
