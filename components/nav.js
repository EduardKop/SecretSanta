import React from "react";
import styles from '../styles/Home.module.css'
import Link from "next/link";

function Nav () {
    return (
        <div className={styles.navWrapper}>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/info" className={styles.link}>Info</Link>
                    <Link href="/contacts" className={styles.link}>Contacts</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Nav