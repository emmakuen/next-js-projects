import { readFile } from "fs/promises";
import { marked } from "marked";

const getPost = async (slug) => {
  const source = await readFile(`content/posts/${slug}.md`, "utf-8");
  const html = marked(source);
  return {
    body: html,
  };
};

export { getPost };
