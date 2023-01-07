import toSlug from "./toSlug";
import GITHUB from "../configs/github";
import { encode } from "js-base64";

function createMatter(config) {
  const localKRDate = new Date().setHours(new Date().getHours() + 9);
  const date = new Date(localKRDate).toISOString().slice(0, 10);
  const fmConfig = Object.assign(config, { date });

  return Object.entries(fmConfig).reduce((acc, [option, value]) => {
    return Array.isArray(value)
      ? acc += `\r\n${option}:${value.map(val => `\r\n  - ${val}`).join("")}`
      : acc += `\r\n${option}: ${value}`;
  }, "---") + "\r\n---";
};

export async function publishPost({ body, ...config }) {
  const frontMatter = createMatter(config);
  const fileName = toSlug(config.title) + ".md";
  const url = `https://api.github.com/repos/${GITHUB.REPO}/contents/posts/${fileName}`;

  try {
    const upload = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${GITHUB.TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Post: update ${config.title}`,
        content: encode(frontMatter + "\r\n\r\n" + body),
      }),
    });
    const result = await upload.json();

    return result;
  } catch (error) {
    return new Error(error);
  }
}

export async function editPost({ body, ...config }) {
  const frontMatter = createMatter(config);
  const fileName = toSlug(config.title) + ".md";
  const url = `https://api.github.com/repos/${GITHUB.REPO}/contents/posts/${fileName}`;

  try {
    const response = await fetch(url);
    const { sha } = await response.json();

    const upload = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${GITHUB.TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Post: update ${config.title}`,
        content: encode(frontMatter + "\r\n\r\n" + body),
        sha,
      }),
    });
    const result = await upload.json();

    return result;
  } catch (error) {
    return new Error(error);
  }
}
