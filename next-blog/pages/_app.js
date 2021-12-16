import Head from "next/head";
import NavBar from "../components/NavBar";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default App;
