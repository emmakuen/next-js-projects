import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({
  title,
  description = "Find or list your houses",
  children,
}) => {
  return (
    <div>
      <Head>
        <title>House Marketplace {title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
