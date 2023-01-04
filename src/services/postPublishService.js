import toSlug from "../utils/toSlug";

export function createMatter(config) {
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
  const response = await fetch("./api/posts/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: toSlug(config.title) + ".md",
      content: frontMatter + "\r\n\r\n" + body,
    }),
  });

  return response.json();
}
