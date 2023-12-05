import fs from "fs";
import path from "path";

import type { Dirent } from "fs";

function getAllDirent(path: string): Dirent[] {
  return fs.readdirSync(path, {
    encoding: "utf-8",
    withFileTypes: true,
  });
}

function postFileNameToSlug(fileName: string) {
  return fileName.replace(".md", "");
}

export function getAllPostSlug(): string[] {
  const postsPath = path.join(process.cwd(), "posts");

  return getAllDirent(postsPath)
    .filter((dirent) => dirent.isFile())
    .filter((dirent) => path.extname(dirent.name) === ".md")
    .map((dirent) => postFileNameToSlug(dirent.name));
}
