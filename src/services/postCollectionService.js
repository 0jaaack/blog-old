import fs from "fs";
import path from "path";
import fm from "front-matter";

import POST from "../configs/post";

export function getPostDetails(postTitle) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "posts", postTitle),
    { encoding: "utf8" },
  );
  const { attributes } = fm(file);

  return Object.entries(attributes)
    .map((attr) => {
      return attr[1] instanceof Date
        ? [attr[0], attr[1].toISOString().slice(0, 10)]
        : attr;
    })
    .reduce((result, [key, value]) => {
      return Object.assign(result, { [key]: value });
    }, {});
}

export function getPostContent(postTitle) {
  const file = fs.readFileSync(
    path.join(process.cwd(), "posts", postTitle),
    { encoding: "utf8" },
  );
  const { body } = fm(file);

  return body;
}

export function getAllPostFileNames() {
  return fs.readdirSync(
    path.join(process.cwd(), "posts"),
    { recursive: true },
  );
}

export function getPage(pageIndex) {
  if (isNaN(pageIndex)) {
    return new Error("pageIndex is not a Number");
  }

  return getAllPostFileNames()
    .map((post) => getPostDetails(post))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice((pageIndex - 1) * POST.DEFAULT_NUMBER_OF_POSTS, pageIndex * POST.DEFAULT_NUMBER_OF_POSTS);
}

export function getPostTags() {
  const tagData = getAllPostFileNames()
    .map((post) => {
      const { tags } = getPostDetails(post);
      return tags;
    })
    .reduce((acc, cur) => acc.concat(cur), [])
    .reduce((acc, cur) => {
      if (!!acc[cur]) {
        return Object.assign(acc, { [cur]: acc[cur] + 1 });
      }

      return Object.assign(acc, { [cur]: 1 });
    }, {});

  return Object.keys(tagData)
    .sort((a, b) => tagData[b] - tagData[a])
    .map((key) => [key, tagData[key]]);
}
