import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getPosts } from "../lib/posts";

export async function getStaticProps() {
  const posts = await getPosts();
  return {
    props: { posts },
  };
}

const HomePage = ({ posts }) => {
  const renderLinks = () =>
    posts.map((post) => (
      <li key={post.slug}>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </li>
    ));
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <meta name="description" value="This is my blog" />
      </Head>
      <h1>My Blog</h1>
      <ul>{renderLinks()}</ul>
    </div>
  );
};

export default HomePage;
