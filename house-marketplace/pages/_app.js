import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/authContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;
