import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LowerLeftCircle from "../components/svg/lower-left-circle.svg";
import RightMiddleCircle from "../components/svg/right-middle-circle.svg";
import LowerRightPolygon from "../components/svg/lower-right-polygon.svg";
import UpperCircle from "../components/svg/upper-circle.svg";
import "../styles/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function App({ Component, pageProps }) {
  return (
    <div className="page-container">
      <Head>
        <title>Emma&apos;s Website</title>
        <meta
          name="description"
          content="Welcome to the personal portfolio website of Emma."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="icon" href="images/favicon.png" />
      </Head>

      <Navbar />
      <LowerLeftCircle className="lower-left-circle svg" />
      <RightMiddleCircle className="right-middle-circle svg" />
      <RightMiddleCircle className="right-middle-circle svg" />
      <LowerRightPolygon className="lower-right-polygon svg" />
      <UpperCircle className="upper-circle" />

      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
