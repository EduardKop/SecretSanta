import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import Script from "next/script";
import { useEffect } from "react";
import '../styles/home.css'
import Snowfall from 'react-snowfall'



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
  <>
      <div style={{  }}>
    <Snowfall   snowflakeCount={100} />
    <Component {...pageProps} />

  </div>
  </>)
}

export default MyApp;