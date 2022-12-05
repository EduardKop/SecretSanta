import React from "react";
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import snowFooterIng from '../img/footer.png'

function Footer(){
    return(
        <footer className={styles.footer}>
        <p className={styles.footerP} style={{
      backgroundImage: `url(${snowFooterIng.src})`,
      width: '100%',
    }}><span>© 2022 Eduard</span></p>


        </footer>
    )
}

export default Footer