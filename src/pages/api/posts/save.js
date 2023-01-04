import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Not Found" });
  }

  const { fileName, content } = req.body;

  if (!fileName || !content) {
    return res.status(200).json({ status: false });;
  }

  await fs.writeFile(
    path.join(process.cwd(), "posts", req.body.fileName),
    req.body.content
  );
  res.status(200).json({ status: "저장이 완료되었습니다." });
}
