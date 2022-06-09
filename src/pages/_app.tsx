import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";

import { MainProvider } from "@/context/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <ToastContainer
        pauseOnFocusLoss={false}
        hideProgressBar={false}
        newestOnTop={false}
        position="top-right"
        autoClose={3000}
        closeOnClick
        limit={1}
        rtl={false}
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default MyApp;
