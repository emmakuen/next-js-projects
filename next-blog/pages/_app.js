import NavBar from "../components/NavBar";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default App;
