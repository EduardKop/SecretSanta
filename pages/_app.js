import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import Script from "next/script";
import { useEffect } from "react";
import '../styles/home.css'
import Snowfall from 'react-snowfall'
import Footer from '../components/footer';



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
  <>

    <Snowfall  style={{
    // zIndex:1
  }}/>
      <Component {...pageProps} />

  <Footer />

  </>)
}

export default MyApp;