import fs from "fs";
import path from "path";
import fm from "front-matter";

import { POST } from "../constants/post";
import { getAllPostSlug } from "./getAllPostSlug";

export type PostMetadata = {
  title: string;
  tags: string[];
  published: boolean;
  date: string;
  description: string;
};

export type Post = {
  metadata: PostMetadata;
  body: string;
};

function slugToPostFileName(slug: string) {
  return `${slug}.md`;
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, {
    encoding: "utf-8",
  });
}

export function getPostMetadata(postSlug: string): PostMetadata {
  type FrontMatterAttributes = {
    title: string;
    tags: string[];
    published: boolean;
    date: Date | string;
    description: string;
  };

  const postFlieName = slugToPostFileName(postSlug);
  const postPath = path.join(process.cwd(), "posts", postFlieName);
  const file = readFile(postPath);
  const { attributes: metadata } = fm<FrontMatterAttributes>(file);

  return {
    ...metadata,
    date:
      metadata.date instanceof Date
        ? metadata.date.toISOString()
        : metadata.date,
  };
}

export function getPostContent(postSlug: string): string {
  const postFlieName = slugToPostFileName(postSlug);
  const postPath = path.join(process.cwd(), "posts", postFlieName);
  const file = readFile(postPath);
  const { body } = fm(file);

  return body;
}

export function getPostBySlug(postSlug: string): Post {
  return {
    metadata: getPostMetadata(postSlug),
    body: getPostContent(postSlug),
  };
}

export function getPosts({
  pageIndex = 1,
  tagName,
}: {
  pageIndex?: number;
  tagName?: string;
}): PostMetadata[] {
  return getAllPostSlug()
    .map((post) => getPostMetadata(post))
    .filter((post) => post.published)
    .filter((post) => (!!tagName ? post.tags.includes(tagName) : true))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .slice(
      (pageIndex - 1) * POST.DEFAULT_NUMBER_OF_POSTS,
      pageIndex * POST.DEFAULT_NUMBER_OF_POSTS
    );
}
