import React from "react";
import Head from "next/head";

import NavBar from "./NavBar";

const Page = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="px-6 py-4">
        <h1 className="text-2xl pb-4">{title}</h1>
        {children}
      </main>
    </>
  );
};

export default Page;
