import React from "react";
import Head from "next/head";

export async function getStaticProps() {
  return {
    props: {
      title: "First Post",
      body: "My first post, as static props.",
    },
  };
}

const FirstPost = (props) => {
  console.log(props);
  return (
    <div>
      <Head>
        <title>{props.title} - My Blog</title>
      </Head>
      <h1>{props.title}</h1>
      <p>{props.body}</p>
    </div>
  );
};

export default FirstPost;
