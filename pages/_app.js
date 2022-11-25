import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import Script from "next/script";
import { useEffect } from "react";
import '../styles/home.css'



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;