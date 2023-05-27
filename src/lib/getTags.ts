import { getAllPostSlug } from "./getAllPostSlug";
import { getPostMetadata } from "./getPost";

export type TagPair = [tagName: string, postCount: number];

export function getPostTags(): TagPair[] {
  const tagEntity: Record<string, number> = getAllPostSlug()
    .map((post) => getPostMetadata(post).tags)
    .flat()
    .reduce((tagEntity, tag) => {
      return tagEntity[tag]
        ? { ...tagEntity, [tag]: tagEntity[tag] + 1 }
        : { ...tagEntity, [tag]: 1 };
    }, {} as Record<string, number>);

  return Object.entries(tagEntity).sort((a, b) => b[1] - a[1]);
}
