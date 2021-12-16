import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

const getPost = async (slug) => {
  const source = await readFile(`content/posts/${slug}.md`, "utf-8");
  const {
    data: { date, title },
    content,
  } = matter(source);
  const body = marked(content);
  return { date, title, body };
};

const getSlugs = async () => {
  const suffix = ".md";
  const files = await readdir("content/posts");
  return files
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.slice(0, -suffix.length));
};

export { getPost, getSlugs };
