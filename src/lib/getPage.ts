import { POST } from "../constants/post";
import { getAllPostSlug } from "./getAllPostSlug";
import { getPostMetadata } from "./getPost";

import type { PostMetadata } from "./getPost";

export function getPage({ pageIndex }: { pageIndex: number }): PostMetadata[] {
  return getAllPostSlug()
    .map((post) => getPostMetadata(post))
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .slice(
      (pageIndex - 1) * POST.DEFAULT_NUMBER_OF_POSTS,
      pageIndex * POST.DEFAULT_NUMBER_OF_POSTS
    );
}
