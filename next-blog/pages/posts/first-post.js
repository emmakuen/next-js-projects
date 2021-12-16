import React from "react";
import Head from "next/head";

const FirstPost = () => {
  return (
    <div>
      <Head>
        <title>Post 1 - My Blog</title>
      </Head>
      <h1>Post 1</h1>
      <p>This is my first blog post on next-js.</p>
    </div>
  );
};

export default FirstPost;
