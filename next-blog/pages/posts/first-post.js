import React from "react";
import Head from "next/head";
import { getPost } from "../../lib/posts";

export async function getStaticProps() {
  const post = await getPost("first-post");
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
      <article dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
};

export default FirstPost;
