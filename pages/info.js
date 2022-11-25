import Link from "next/link";
import styles from '../styles/Home.module.css'

const Info = () => {
    return (
        <div>
        <div className={styles.navWrapper}>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/info" className={styles.link}>Info</Link>
                    <Link href="/contacts" className={styles.link}>Contacts</Link>
                </ul>
            </nav>
        </div>
          info
        </div>
    )
}

export default Info