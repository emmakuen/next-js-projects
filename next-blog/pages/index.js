import React from "react";
import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <meta name="description" value="This is my blog" />
      </Head>
      <h1>My Blog</h1>
      <ul>
        <li>
          <Link href="/posts/first-post">Post 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
