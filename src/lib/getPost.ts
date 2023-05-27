import fs from "fs";
import path from "path";
import fm from "front-matter";

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

export function getPost(postSlug: string): Post {
  return {
    metadata: getPostMetadata(postSlug),
    body: getPostContent(postSlug),
  };
}
