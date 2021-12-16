import React from "react";
import Head from "next/head";
import { readFile } from "fs/promises";

export async function getStaticProps() {
  const data = await readFile("content/posts/first-post.json", "utf-8");
  const post = JSON.parse(data);
  return {
    props: { post },
  };
}

const FirstPost = ({ post }) => {
  console.log({ post });
  return (
    <div>
      <Head>
        <title>{post.title} - My Blog</title>
      </Head>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default FirstPost;
